import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import ValidationMessage from "../../atoms/validationMessage/validationMessage";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";


class InputPhone extends BasicAtom {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Render element
     *
     * @return {*}
     */
    render(className, props) {
        return (
            <>
                {this.render_label()}

                <PhoneInput
                    id={this.props.id}
                    className={
                        "Form-input-phone "
                        + this.padIfString(className)
                        + this.getClassNameString()
                    }
                    placeholder={this.props.placeholder}
                    defaultCountry={'GB'}
                    flags={flags}
                    value={this.props.value}
                    onClick={(e) => {
                        this.handleClick(e);
                    }}
                    onChange={(val) => {
                        this.updateValue(val);
                    }}
                />

                {this.render_validation()}
            </>
        );
    }


    render_label() {
        if (this.props.for && this.props.for.length) {
            return (
                <Label for={this.props.for}>
                    {this.props.labelText}
                </Label>
            );
        }
    }


    render_validation() {
        if (this.props.message && this.props.message.length) {
            return (
                <ValidationMessage
                    className={
                        (this.props.error ? ' error' : '')
                        +
                        (this.props.success ? ' success' : '')
                    }
                    message={this.props.message}
                />
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


export default InputPhone;