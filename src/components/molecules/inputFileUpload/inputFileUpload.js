import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import './inputFileUpload.css';
import IconAttachment from "../../atoms/icons/attachment";
import UploadedFile from "../../atoms/uploadedFile/uploadedFile";
import ListItem from "../../atoms/listItem/listItem";
import IconSpinner from "../../atoms/icons/spinner";
import file from "../../atoms/icons/file";
// import ValidationMessage from "../../atoms/validationMessage/validationMessage";


class InputFileUpload extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            isLoading: false,
            fileList: []
        });
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Render element
     *
     * @return {*}
     */
    render(className, props) {
        return (
            <div className="Input-file-upload">
                <label htmlFor={(this.props.forId ? this.props.forId : 'file-upload')}>
                    {this.render_icon()}

                    {this.props.name}
                </label>

                <input
                    id={(this.props.forId ? this.props.forId : 'file-upload')}
                    type="file"
                    onChange={(e) => {
                        this.processFiles(e.target.files);
                    }}
                />

                {this.render_files()}

                {/*TODO progressively enhance with a loader/progress*/}
            </div>
        );
    }


    render_files() {
        if (this.state.fileList && this.state.fileList.length) {
            return (this.state.fileList ?? []).map((value, index) => {
                return (
                    <UploadedFile
                        fileName={value}
                        onClick={() => {
                            this.removeUpload(index);
                        }}
                        disabled={this.state.isLoading}
                        key={"value" + index}
                    />
                );
            });
        }
    }

    render_icon() {
        if (this.state.isLoading) {
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

    processFiles(files) {
        const newList = [...this.state.fileList];

        for (let i = 0; i < files.length; i++) {
            newList.push(files[i].name);
        }

        this.setState({
            newList: this.state.fileList = newList
        });

        this.updateAPI();
    }


    removeUpload(toRemove) {
        const updatedList = [...this.state.fileList];

        updatedList.splice(toRemove, 1);

        this.setState({
            newList: this.state.fileList = updatedList
        });

        this.updateAPI();
    }


    updateAPI() {
        let filename = this.state.fileList[this.state.fileList.length - 1];
        //@todo: Get the real file
        let file = 'THE FILE!!!';
        //let file = this.state.file[this.state.file.length - 1];

        this.setState({
            isLoading: true
        });

        this.callbackOr(this.props.urlGenerator, 'https://127.0.0.1', true)(filename)
            .catch((error) => {
                // handle error in UI
                this.callbackOr(this.props.onError)(error);
                // no longer loading
                this.setState({
                    isLoading: false
                });
            })
            .then(
            (url) => {
                let promise = (typeof this.props.uploadHandler !== 'undefined')
                    ? this.props.uploadHandler(filename, url, file, this.props.uploadMethod)
                    : this.fallbackUploadHandler(filename, url, file, this.props.uploadMethod)

                promise.catch((error)=>{
                    // handle error in UI
                    this.callbackOr(this.props.onError)(error);
                }).then((fileUrl)=>{
                    // handle success in UI
                    this.callbackOr(this.props.onSuccess)(filename, fileUrl);
                }).finally(
                    () => {
                        // no longer loading
                        this.setState({
                            isLoading: false
                        });
                    }
                );
            }
        );
    }

    fallbackUploadHandler(filename, url, file, method) {
        let formData = new FormData();
        formData.append(filename, file);

        return fetch(url, {method: method ?? "PUT", body: formData});
    }



    // render_validation() {
    //     if (this.props.message && this.props.message.length) {
    //         return (
    //             <ValidationMessage
    //                 className={
    //                     (this.props.error ? ' error' : '')
    //                     +
    //                     (this.props.success ? ' success' : '')
    //                 }
    //                 message={this.props.message}
    //             />
    //         );
    //     }
    // }
}


export default InputFileUpload;