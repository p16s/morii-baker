import React from "react";
import PropTypes from 'prop-types';
import BasicAtom from "../basicAtom";
import './alert.css';


class Alert extends BasicAtom {
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
            <span
                className={"Alert" + this.padIfString(className) + this.getClassNameString()}
                onClick={(e) => {
                    this.handleClick(e)
                }}
            >
                {this.props.children}

                {this.props.text}
            </span>,
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


export default Alert;