import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import './noDataMessage.css';


class NoDataMessage extends BasicAtom {
    render(className) {
        return (
            <aside className={
                "No-data-message"
                + this.padIfString(className)
                + this.getClassNameString()
            }>
                <IconUser />
                {this.props.children}
            </aside>
        );
    }
}


export default NoDataMessage;