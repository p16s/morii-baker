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
                <Label
                    for={this.props.for}
                >
                    {this.props.labelText}
                </Label>

                <FormPin />

                <ValidationMessage
                    className={
                        (this.props.error ? ' error' : '')
                        +
                        (this.props.success ? ' success' : '')
                    }
                    message={this.props.message}
                />
            </>
        );
    }
}


export default Pin;