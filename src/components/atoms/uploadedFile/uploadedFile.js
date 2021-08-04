import React from "react";
import BasicAtom from "../basicAtom";
import './uploadedFile.css';
import IconFile from "../icons/file";
import IconClose from "../icons/close";


class UploadedFile extends BasicAtom {
    render(className, props) {
        return (
            this.render_standard()
        );
    }


    render_standard(className, props) {
        return React.cloneElement(
            <button
                className={
                    "Uploaded-file"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
                type="button"
                onClick={(e) => {
                    this.handleClick(e)
                }}
                disabled={this.props.disabled}
            >
                <IconFile />

                {this.props.fileName}

                <IconClose />
            </button>,
            props ?? {}
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleClick(e) {
        this.callbackOr(this.props.onClick)(e);
    }
}


export default UploadedFile;