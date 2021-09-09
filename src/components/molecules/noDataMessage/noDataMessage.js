import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import './noDataMessage.css';
import IconUser from "../../atoms/icons/user";


class NoDataMessage extends BasicAtom {
    render(className) {
        return (
            <aside
                className={
                    "No-data-message"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                {this.props.image ? this.props.image : <IconUser />}

                {this.props.children}
            </aside>
        );
    }
}


export default NoDataMessage;