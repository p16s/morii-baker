import React from "react";
import PropTypes from 'prop-types';
import BasicAtom from "../basicAtom";
import "./input.css";


class Input extends BasicAtom {
    constructor(props) {
        super(props);

        this.state = {
            value: ""
        }
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
                className={"Input" + this.padIfString(className) + this.getClassNameString()}
                type={this.props.type ?? 'text'}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onClick={(e) => {
                    this.handleClick(e)
                }}
                onChange={(e) => {
                    this.updateValue(e.target.value)
                }}
            />,
            props ?? {}
        );
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // States
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Does the input have an error?
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
        })
    }
}

Input.defaultProps = {
    error: false,
    success: false,
}

Input.propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    success: PropTypes.bool,
    disabled: PropTypes.oneOf(["disabled", true, "", false])
}

export default Input;