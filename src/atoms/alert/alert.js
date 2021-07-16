import React from "react";
import PropTypes from 'prop-types';
import BasicAtom from "../basicAtom";
// import './alert.css';


class Alert extends BasicAtom {
    render(text, className) {
        return (
            this.render_standard()
        )
    };


    render_standard() {
        return this.render_element();
    }


    render_element(className, props) {
        return React.cloneElement(
            <div>ALERT</div>,
            props ?? {}
        );
    }
}


export default Alert;