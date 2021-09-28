import React from "react";
import BasicAtom from "../../atoms/basicAtom";
import Alert from "../../atoms/alert/alert";
import "./toast.css";
import {CSSTransition} from "react-transition-group";
import IconTick from "../../atoms/icons/tick";
import IconAlert from "../../atoms/icons/alert";


class Toast extends BasicAtom {
    /**
     * default props
     * @type {{showTime: number}}
     */
    static defaultProps = {
        showTime: 3000,
        position: "bottom"
    }


    /**
     * start the timer as soon as component mounts AND when updates prop
     */
    componentDidMount() {
        if (this.props.isVisible) {
            this.startRemovalTimer();
        }
    }
    componentDidUpdate() {
        if (this.props.isVisible) {
            this.startRemovalTimer();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * main render
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <aside
                className={
                    "Toast"
                    + this.padIfString(className)
                    + (this.props.position === "bottom" ? " bottom" : '')

                }
                type={this.props.type}
            >
                <CSSTransition
                    in={this.props.isVisible}
                    classNames="fade-in"
                    appear={true}
                    timeout={300}
                    unmountOnExit
                >
                    {this.render_alert()}
                </CSSTransition>
            </aside>
        );
    }


    /**
     * render the alert, based on state
     * @returns {JSX.Element}
     */
    render_alert() {
        // if (this.props.isVisible) {
            return (
                <Alert
                    className={
                        this.props.className
                       + (this.props.type === "success" ? " success" : '')
                       + (this.props.type === "error" ? " error" : '')
                    }
                >
                    { this.props.type === "success" ? <IconTick /> : '' }
                    { this.props.type === "error" ? <IconAlert /> : '' }
                    {this.props.children}
                </Alert>
            );
        // }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    startRemovalTimer() {
        setTimeout(() => {
            this.callbackOr(this.props.stoppedShowing)(true);
        }, this.props.showTime);
    }
}


export default Toast;