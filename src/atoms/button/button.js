import React from "react";
import PropTypes from 'prop-types';
import BasicAtom from "../basicAtom";
import './button.css';


class Button extends BasicAtom {
    render(text, className) {
        return (
            this.isDisabled() ? this.render_disabled() : this.render_standard()
        )
    };


    render_standard() {
        return this.render_element();
    }


    render_disabled() {
        return this.render_element('', {disabled: "disabled"});
    }


    render_element(className, props) {
        return React.cloneElement(
            <button className={"Button" + this.padIfString(className) + this.getClassNameString()}>
                {this.props.text}

                {this.props.children}
            </button>,
            props ?? {}
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // States
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Is it disabled?
     *
     * @returns {boolean}
     */
    isDisabled() {
        return (this.props.disabled === "disabled" || this.props.disabled === true);
    }
}


Button.propTypes = {
    disabled: PropTypes.oneOf(["disabled", true, "", false])
}


export default Button;