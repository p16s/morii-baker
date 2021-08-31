import React from "react";
import BasicAtom from "../basicAtom";
import './file.css';
import IconFile from "../icons/file";
import IconClose from "../icons/close";


class File extends BasicAtom {
    render(className, props) {
        return (
            this.render_standard()
        );
    }


    render_standard(className, props) {
        return React.cloneElement(
            <button
                className={
                    "File"
                    + this.padIfString(className)
                    + this.getClassNameString()
                    + (this.props.noRemove ? ' no-remove' : '')
                }
                type="button"
                onClick={(e) => {
                    this.handleClick(e)
                }}
                disabled={this.props.disabled}
            >
                <IconFile />

                <span title={this.props.fileName}>{this.props.fileName}</span>

                {this.render_remove()}
            </button>,
            props ?? {}
        );
    }


    render_remove() {
        if (!this.props.noRemove) {
            return (
                <IconClose/>
            );
        }
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


export default File;