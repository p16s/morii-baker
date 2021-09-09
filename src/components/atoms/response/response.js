import BasicAtom from "../basicAtom";
import "./response.css";
import React from "react";


class Response extends BasicAtom {
    render(className) {
        return (
            <span
                className={
                    "Response"
                    + this.padIfString(className)
                    + this.getClassNameString()
                    + (this.props.disabled ? ' disabled' : '')
                }
                onClick={(e) => {
                    this.handleClick(e, this.props.responseText)
                }}
            >
                {/*TODO make atom and refactor*/}
                <input
                    id={this.props.for}
                    type="radio"
                    name="response"
                    disabled={this.props.disabled}
                />
                <label htmlFor={this.props.for}>
                    {this.props.responseText}
                </label>
            </span>
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
    handleClick(e, picked) {
        this.callbackOr(this.props.onClick)(e, picked);
    }
}


export default Response;