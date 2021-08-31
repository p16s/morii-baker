import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import FormTextarea from "../../atoms/formTextarea/formTextarea";
// import "./formInputPhone.css";


class Textarea extends BasicAtom {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * main render
     *
     * @return {*}
     */
    render(props) {
        return (
            <>
                {this.render_label()}

                {this.render_text()}

                <FormTextarea
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    error={this.props.error}
                    success={this.props.success}
                    value={this.props.value}
                    onChange={(e) => {
                        this.updateValue(e);
                    }}
                />
            </>
        );
    }


    /**
     * check to see if label passed
     * @returns {JSX.Element}
     */
    render_label() {
        if (this.props.labelText && this.props.labelText.length) {
            return (
                <Label
                    for={this.props.for}
                >
                    {this.props.labelText}
                </Label>
            );
        }
    }

    /**
     * check to see if text passed
     * @returns {JSX.Element}
     */
    render_text() {
        if (this.props.text && this.props.text.length) {
            return (
                <p>{this.props.text}</p>
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


export default Textarea;