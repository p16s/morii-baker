import BasicAtom from "../../atoms/basicAtom";
import './modalCenter.css';
import IconClose from "../../atoms/icons/close";
import close from "../../atoms/icons/close";
import {CSSTransition} from "react-transition-group";


class ModalCenter extends BasicAtom {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <>
                <CSSTransition
                    in={this.props.isActive}
                    timeout={300}
                    classNames="fade-in"
                    unmountOnExit
                >
                    {this.render_is_active()}
                </CSSTransition>
            </>
        );
    }


    render_is_active() {
        // if (this.props.isActive) {
            return (
                <div
                    className={
                        "Modal-center "
                        + (this.props.isActive ? 'active' : '')
                    }
                >
                    <div className="for-overflow">
                        <div className="content">
                            <span
                                className="close"
                                onClick={this.handleClick}
                            >
                                 <IconClose/>
                            </span>

                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        // }
    }


    handleClick = (e) => {
        this.props.onClose();
    };

}


export default ModalCenter;