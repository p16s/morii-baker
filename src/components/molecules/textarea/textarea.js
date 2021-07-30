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
                <FormTextarea
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    error={this.props.error}
                    success={this.props.success}
                />
            </>
        );
    }
}


export default Textarea;