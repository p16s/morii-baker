import React from "react";
// import OnOff from "../fundamentals/onOff";
import './formCheckbox.css';
import BasicAtom from "../basicAtom";


class FormCheckbox extends BasicAtom {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.checked
        }
    }


    static defaultProps = {
        checked: false
    };


    render(className, props) {
        return React.cloneElement(
            <input
                id={this.props.id}
                className={
                    "Form-checkbox"
                    + this.padIfString(className)
                    + this.getClassNameString()
                    + (this.state.isChecked ? ' selected' : '')
                }
                type="checkbox"
                checked={this.state.isChecked}
                disabled={this.props.disabled}
                onChange={(e) => {
                    this.handleOnChange(e);
                }}
                onClick={(e) => {
                    this.handleOnChange(e);
                    // this.callbackOr(this.props.onClick)();
                }}
            />,
            props ?? {}
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * handleChange
     *
     * @param {KeyboardEvent} e
     */
    handleOnChange(e) {
        this.setState({
            isChecked: !this.state.isChecked
        });

        this.callbackOr(this.props.onChange)(e);
    }
}


export default FormCheckbox;