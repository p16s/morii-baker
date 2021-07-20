import React from "react";
import BasicAtom from "../basicAtom";
import './toggle.css';


class Toggle extends BasicAtom {
    render(text, className) {
        return (
            this.render_standard()
        )
    }


    render_standard() {
        return this.render_element();
    }


    render_element(className, props) {
        return React.cloneElement(
            <div
                className={
                    "Toggle "
                    + ((this.props.value ?? this.state.value) ? 'on' : 'off')
                    + (this.props.label && this.props.label.length ? ' has-label': '')
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
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleChange(e) {
        let newState = !this.props.value ?? !this.state.value;

        this.callbackOr(this.props.onChange)(e, newState);

        this.setState(
            {
                value: newState,
            }
        );
    }
}


export default Toggle;