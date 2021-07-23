import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import Textarea from "../../atoms/textarea/textarea";
// import "./formInput.css";


class Textareas extends BasicAtom {

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
                <Textarea
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    error={this.props.error}
                    success={this.props.success}
                />
            </>
        );
    }
}


export default Textareas;