import React from "react";
import PropTypes from 'prop-types';
import BasicAtom from "../basicAtom";
import './checkbox.css';


class Checkbox extends BasicAtom {
    render(text, className) {
        return (
            this.render_standard()
        )
    };


    render_standard() {
        return this.render_element();
    }


    render_element(className, props) {
        return React.cloneElement(
            <input
                className={"Checkbox" + this.padIfString(className) + this.getClassNameString()}
                type="checkbox"
                onClick={(e) => {
                    this.handleClick(e)
                }}
            />,
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


export default Checkbox;