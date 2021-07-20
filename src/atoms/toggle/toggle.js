import React from "react";
import BasicAtom from "../basicAtom";


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
                className={"Switch " + ((this.props.value ?? this.state.value) ? 'on' : 'off')}
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