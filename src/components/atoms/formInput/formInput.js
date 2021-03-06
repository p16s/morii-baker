import React from "react";
import PropTypes from 'prop-types';
import BasicAtom from "../basicAtom";
import "./formInput.css";


class FormInput extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            value: ""
        });
    }


    /**
     * Sets state to prop value
     */
    componentDidMount() {
        this.updateValue((this.props.value ? this.props.value : ''));
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Render element
     *
     * @return {*}
     */
    render() {
        return (this.isDisabled())
            ? this.render_disabled()
            : (
                (this.hasError())
                    ? this.render_error()
                    : (
                        this.hasSuccess()
                            ? this.render_success()
                            : this.render_element()
                    )
            );
    }


    /**
     * Render the error component
     *
     * @returns {JSX.Element}
     */
    render_error() {
        return this.render_element('error');
    }


    /**
     * Render the success component
     *
     * @returns {JSX.Element}
     */
    render_success() {
        return this.render_element('success');
    }


    /**
     * Render disabled
     *
     * @returns {JSX.Element}
     */
    render_disabled() {
        return this.render_element('', {disabled: "disabled"});
    }


    /**
     * Render element
     *
     * @param className
     * @return {JSX.Element}
     */
    render_element(className, props) {
        return React.cloneElement(
            <input
                id={this.props.id}
                className={
                    "Form-input"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
                type={this.props.type ?? 'text'}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onFocus={(e) => {
                    this.handleFocus(e);
                }}
                onBlur={(e) => {
                    this.handleBlur(e);
                }}
                onClick={(e) => {
                    this.handleClick(e);
                }}
                onChange={(e) => {
                    this.updateValue(e.target.value);
                }}
                onKeyPress={(e) => {
                    this.handleKeyPress(e);
                }}
            />,
            props ?? {}
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // States
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Does the formInput have an error?
     *
     * @returns {boolean}
     */
    hasError() {
        return (this.props.error !== false);
    }

    /**
     * Great success?
     *
     * @returns {boolean}
     */
    hasSuccess() {
        return (this.props.success !== false);
    }

    /**
     * Is it disabled?
     *
     * @returns {boolean}
     */
    isDisabled() {
        return (this.props.disabled === "disabled" || this.props.disabled === true);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle focus
     *
     * @param {MouseEvent} e
     */
    handleFocus(e) {
        this.callbackOr(this.props.onFocus)(e);
    }

    /**
     * Handle blur
     *
     * @param {MouseEvent} e
     */
    handleBlur(e) {
        this.callbackOr(this.props.onBlur)(e);
    }

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleClick(e) {
        this.callbackOr(this.props.onClick)(e);
    }

    /**
     * Update state
     *
     * @param {KeyboardEvent} e
     */
    updateValue(e) {
        this.setState({
            value: this.value = e
        });

        this.callbackOr(this.props.onChange)(e);
    }

    /**
     * handle a keypress (eg enter)
     *
     * @param {KeyboardEvent} e
     */
    handleKeyPress(e) {
        this.callbackOr(this.props.onKeyPress)(e);

        // pass an enter prop
        if (e.key === 'Enter'){
            this.callbackOr(this.props.onEnter)(e);
        }
    }
}

FormInput.defaultProps = {
    error: false,
    success: false,
}

FormInput.propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    success: PropTypes.bool,
    disabled: PropTypes.oneOf(["disabled", true, "", false])
}

export default FormInput;