import BasicAtom from "../basicAtom";
import React from "react";


class OnOff extends BasicAtom {
    constructor(props, context, valuePropName) {
        super(props, context);

        this.valuePropName = valuePropName ?? 'value';
    }


    render() {
        return (
            this.render_element()
        )
    }


    render_element(className, props) {
        return (
            <span>{this.isOn ? 'on' : 'off'}</span>
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // States
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * @returns {*|boolean}
     */
    get isOn() {
        console.log({
            'isOn': (this.props[this.valuePropName] ?? this.state[this.valuePropName] ?? false),
            'prop':this.props[this.valuePropName],
            'state': this.state[this.valuePropName],
        });
        return (this.props[this.valuePropName] ?? this.state[this.valuePropName] ?? false);
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
        let newState = (!this.props[this.valuePropName]) ?? (!this.state[this.valuePropName]);
        console.log('-', !this.state[this.valuePropName]);
        let newStateObj = {};
        newStateObj[this.valuePropName] = newState;
        console.log("newState", newState);
        this.callbackOr(this.props.onChange)(e, newState);
        this.setState(newStateObj);
    }
}

export default OnOff;