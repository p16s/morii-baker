import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import FormPin from "../../atoms/formPin/formPin";
import ValidationMessage from "../../atoms/validationMessage/validationMessage";


class Pin extends BasicAtom {

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
                <Label for={this.props.for}>
                    {this.props.labelText}
                </Label>

                <FormPin
                    // TODO pass values in
                    length={this.props.length}
                    onChange={(e) => {this.handleKeyPress(e)}}
                    disabled={this.props.disabled}
                />

                {this.render_validation()}
            </>
        );
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
     * handleKeyPress
     *
     * @param {KeyboardEvent} e
     */
    handleKeyPress(e) {
        this.callbackOr(this.props.onChange)(e);
    }
}


export default Pin;