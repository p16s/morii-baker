import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import './noDataMessage.css';
import IconUser from "../../atoms/icons/user";
import {CSSTransition} from "react-transition-group";


class NoDataMessage extends BasicAtom {
    render(className) {
        return (

            <CSSTransition
                in={true}
                classNames="fade-in"
                appear={true}
                timeout={200}
                unmountOnExit
            >
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
            </CSSTransition>
        );
    }
}


export default NoDataMessage;