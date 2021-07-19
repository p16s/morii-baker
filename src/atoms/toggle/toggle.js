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
            <span
                className={"Toggle" + this.padIfString(className) + this.getClassNameString()}
            >
                [TOGGLE]
            </span>,
            props ?? {}
        );
    }
}


export default Toggle;