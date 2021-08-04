import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import './inputFileUpload.css';
import IconAttachment from "../../atoms/icons/attachment";
import UploadedFile from "../../atoms/uploadedFile/uploadedFile";
import ListItem from "../../atoms/listItem/listItem";
import IconSpinner from "../../atoms/icons/spinner";
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
                    multiple
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
                <IconAttachment />
            );
        } else {
            return (
                <IconSpinner />
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
        // TODO not sure how this is handled properly yet

        this.setState({
            isLoading: true
        });

        //  then call api
        //  update isLoading in response
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