import "./checkbox.css";
import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Label from "../../atoms/label/label";
import FormCheckbox from "../../atoms/formCheckbox/formCheckbox";


class Checkbox extends BasicAtom {

    static defaultProps = {
        checked: false
   };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Render element
     *
     * @return {*}
     */
    render(props, className) {
        return (
            <div
                className={
                    "Checkbox"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                <FormCheckbox
                    id={this.props.id}
                    className={this.props.inputClass}
                    value={this.props.value}
                    disabled={this.props.disabled}
                    checked={this.props.checked}
                    onChange={(e) => {
                        this.handleOnChange(e);
                    }}

                />
                {this.render_label()}
            </div>
        );
    }


    /**
     * render label
     * @returns {JSX.Element}
     */
    render_label() {
        if (this.props.for && this.props.for.length) {
            return (
                <Label
                    className={
                        this.props.disabled ? ' disabled' : ''
                    }
                    for={this.props.for}
                >
                    {this.props.labelText}
                </Label>
            );
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * handle a keypress (eg enter)
     *
     * @param {KeyboardEvent} e
     */
    handleOnChange(e) {
        this.callbackOr(this.props.onChange)(e);
    }
}


export default Checkbox;