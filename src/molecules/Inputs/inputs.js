import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import Input from "../../atoms/input/input";
import ValidationMessage from "../../atoms/validationMessage/validationMessage";
// import "./input.css";


class Inputs extends BasicAtom {

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
                <Input
                    id={this.props.id}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    error={this.props.error}
                    success={this.props.success}
                />

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


export default Inputs;