import React from "react";
import OnOff from "../fundamentals/onOff";
import './checkbox.css';


class Checkbox extends OnOff {
    constructor(props, context) {
        super(props, context, 'selected');
    }


    render_element(className, props) {
        return React.cloneElement(
            <input
                className={
                    "Checkbox"
                    + this.padIfString(className)
                    + this.getClassNameString()
                    + (this.isOn ? ' selected' : '')
                }
                type="checkbox"
                onClick={(e) => {
                    this.handleChange(e);
                    this.callbackOr(this.props.onClick)();
                }}
                disabled={this.props.disabled}
            />,
            props ?? {}
        );
    }
}


export default Checkbox;