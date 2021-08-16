import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import FormInput from "../../atoms/formInput/formInput";
import ValidationMessage from "../../atoms/validationMessage/validationMessage";


class Input extends BasicAtom {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Render element
     *
     * @return {*}
     */
    render(props) {
        return (
            <>
                {this.render_label()}

                <FormInput
                    id={this.props.id}
                    className={this.props.inputClass}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    error={this.props.error}
                    success={this.props.success}
                    onChange={(e) => {
                        this.updateValue(e);
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
     * Callback to pass value up
     *
     * @param {KeyboardEvent} e
     */
    updateValue(e) {
        this.callbackOr(this.props.onChange)(e);
    }
}


export default Input;