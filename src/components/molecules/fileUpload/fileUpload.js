import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import './fileUpload.css';
import IconAttachment from "../../atoms/icons/attachment";
import File from "../../atoms/file/file";
import IconSpinner from "../../atoms/icons/spinner";


class FileUpload extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            uploadedFiles: props.uploadedFiles ?? [],
            fileList: []
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * main render
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <div className="File-upload">
                <label
                    className={(this.isLoading ? 'disabled' : '')}
                    htmlFor={(this.props.forId ? this.props.forId : 'file-upload')}
                >
                    {this.render_icon()}

                    {this.props.name}
                </label>

                <input
                    id={(this.props.forId ? this.props.forId : 'file-upload')}
                    type="file"
                    onChange={(e) => {
                        this.processFiles(e.target.files);
                    }}
                    multiple
                />
                {this.render_already_uploaded()}

                {this.render_files()}
            </div>
        );
    }

    /**
     * any already uploaded
     * @returns {unknown[]}
     */
    render_already_uploaded() {
        return (this.state.uploadedFiles ?? []).map((value, index) => {
            return (
                <File
                    fileName={value.name}
                    onClick={() => {
                        this.removeExisting(index);
                    }}
                    disabled={this.isLoading}
                    key={"value-" + index}
                />
            );
        });
    }


    /**
     * show the files uploaded
     * @returns {unknown[]}
     */
    render_files() {
        if (this.state.fileList && this.state.fileList.length) {
            return (this.state.fileList ?? []).map((value, index) => {
                return (
                    <File
                        fileName={value.name}
                        onClick={() => {
                            this.removeUpload(index);
                        }}
                        disabled={this.isLoading}
                        key={"value-" + index}
                    />
                );
            });
        }
    }


    /**
     * render the icon, based on state
     * @returns {JSX.Element}
     */
    render_icon() {
        if (this.isLoading) {
            return (
                <IconSpinner />
            );
        } else {
            return (
                <IconAttachment />
            );
        }
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // methods
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param files
     * @returns {Promise<void>}
     */
    async processFiles(files) {
        const newList = [...this.state.fileList];
        this.isLoading = true;

        for (let i = 0; i < files.length; i++) {
            let newFile = this.processFiles_reName(newList, files[i]);

            await this.updateAPI(newFile)
                .then((response) => {
                    console.log(response);
                    newList.push(
                        {
                            name: newFile.name,
                            location: response.filename,
                        }
                    );
                    this.callbackOr(this.props.onSuccess)(response, newFile);
                    // UI update?
                })
                .catch((error) => {
                    this.callbackOr(this.props.onError)(error);
                })
        }

        document.getElementById("passed").value = '';
        this.setState({fileList: newList});
        this.isLoading = false;
    }

    /**
     * Renames the file uploaded if needed.
     * @param files
     * @param file
     * @returns {File|*}
     */
    processFiles_reName(files, file) {
        let count = 1,
            startName = file.name,
            filename = file.name;

        if (this.processFiles_reName_needsRename(files, startName)) {
            while (this.processFiles_reName_needsRename(files, filename)) {
                filename = this.processFiles_reName_newName(startName, count);
                count++;
            }
            let blob = file.slice(0, file.size, file.contentType);
            return new File([blob], filename,{type: file.contentType});
        }
        return file;
    }

    /**
     * Check if the file needs a rename
     * @param files
     * @param filename
     * @returns {boolean}
     */
    processFiles_reName_needsRename(files, filename) {
        let needsRename = false;

        files.forEach((existingFile) => {
            if (existingFile.name.toString() === filename) {
                needsRename = true;
            }
        });

        return needsRename;
    }

    /**
     * create a new file
     * @param filename
     * @param count
     * @returns {string}
     */
    processFiles_reName_newName(filename, count) {
        count = count ?? 1;
        let newNameArray = filename.split('.');
        let newName = newNameArray[0] + '(' + count + ')';

        newNameArray.shift();
        if (newNameArray.length > 0) {
            newName = newName + '.' + newNameArray.join('.');
        }

        return newName;
    }


    /**
     * remove existing file
     * @param toRemove
     */
    removeExisting(toRemove) {
        const updatedList = [...this.state.uploadedFiles];
        const removed = updatedList.splice(toRemove, 1);

        this.callbackOr(this.props.onRemove)(removed);

        this.setState({
            uploadedFiles: updatedList
        });
    }


    /**
     * remove file
     * @param toRemove
     */
    removeUpload(toRemove) {
        const updatedList = [...this.state.fileList];
        const removed = updatedList.splice(toRemove, 1);

        this.callbackOr(this.props.onRemove)(removed);

        this.setState({
            fileList: updatedList
        });
    }


    /**
     * @param file
     * @returns {Promise<T>}
     */
    updateAPI(file) {
        return this.callbackOr(this.props.urlGenerator, 'https://127.0.0.1', true)(file)
            .then((url) => {
                let filename = file.name;
                if (typeof url === 'object') {
                    filename = url.filename;
                    url = url.signedRequest;
                }

                let promise = (typeof this.props.uploadHandler !== 'undefined')
                    ? this.props.uploadHandler(url, file, this.props.uploadMethod)
                    : this.fallbackUploadHandler(url, file, this.props.uploadMethod);


                return promise
                    .then((response)=>{
                        return this.updateAPI_handleResponse(response, filename);
                    }).catch((error)=>{
                        return this.updateAPI_error(error);
                    });
            });
    }

    /**
     * @param response
     * @param filename
     *
     * @returns {Promise}
     */
    updateAPI_handleResponse(response, filename) {
        if (response.status !== 200 && response.status !== 201) {
            return this.updateAPI_error(response.statusText);
        }
        return Promise.resolve({uploadResponse: response, filename: filename});
    }


    updateAPI_error(error) {
        return Promise.reject(error);
    }

    fallbackUploadHandler(url, file, method) {
        return fetch(url, { method: method ?? "PUT", body: file });
    }
}


export default FileUpload;