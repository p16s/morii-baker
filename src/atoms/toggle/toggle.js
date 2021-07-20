import React from "react";
import './toggle.css';
import OnOff from "../fundamentals/onOff";


class Toggle extends OnOff {
    render_element(className, props) {
        return React.cloneElement(
            <div
                className={
                    "Toggle "
                    + (this.isOn ? 'on' : 'off')
                    + (this.hasLabel ? ' has-label' : '')
                    + this.padIfString(className) + this.getClassNameString()
                }
                onClick={(e)=>{this.handleChange(e)}}
            >
                <div className={"switcher"}>
                    <div className={"widget"} />
                </div>
                <span className={"label"}>{this.props.label}</span>
            </div>,
            props ?? {}
        );
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // States
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @returns {boolean}
     */
    get hasLabel() {
        return (this.props.label && this.props.label.length);
    }
}


export default Toggle;