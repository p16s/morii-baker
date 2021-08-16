import React from "react";
import BasicAtom from "../basicAtom";
import './tab.css';


class Tab extends BasicAtom {
    render(props, className) {
        return (
            <span
                className={
                    "Tab "
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
                onClick={(e) => {
                    this.handleClick(e)
                }}
            >
                {this.props.children}
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
    handleClick(e) {
        this.callbackOr(this.props.onClick)(e);
    }
}


export default Tab;
