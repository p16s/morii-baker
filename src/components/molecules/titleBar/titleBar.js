import BasicAtom from "../../atoms/basicAtom";
import './titleBar.css';
import React from "react";


class TitleBar extends BasicAtom {
    render(className, props) {
        return (
            this.render_h1()
        );
    }


    render_h1(className, props) {
        return (
            <div
                className={
                    "Title-bar"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                {this.props.children}
            </div>
        );
    }

}


export default TitleBar;