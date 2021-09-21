import BasicAtom from "../basicAtom";
import "./response.css";
import React from "react";


class Response extends BasicAtom {
    render() {
        return (
            <span
                className={
                    "Response"
                    + this.getClassNameString()
                    + (this.props.disabled ? ' disabled' : '')
                }
                onClick={(e) => {
                    this.handleClick(e, this.props.index)
                }}
            >
                {/*TODO make atom and refactor*/}
                <input
                    id={this.props.for}
                    type="radio"
                    name="response"
                    checked={this.props.selected}
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