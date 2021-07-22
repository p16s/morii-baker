import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import Input from "../../atoms/input/input";
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
                    Example of label text
                </Label>
                <Input
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    error={this.props.error}
                    success={this.props.success}
                />
            </>
        );
    }


}


export default Inputs;