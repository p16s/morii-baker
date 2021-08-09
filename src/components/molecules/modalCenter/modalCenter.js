import BasicAtom from "../../atoms/basicAtom";
import './modalCenter.css';
import IconClose from "../../atoms/icons/close";
import close from "../../atoms/icons/close";


class ModalCenter extends BasicAtom {
    constructor(props) {
        super(props);

    }

    // constructor(props, context) {
    //     super(props, context, {
    //         isActive: null
    //     });
    //
    //     //  set local state to prop
    //     this.state.isActive = this.props.isModalActive;
    // }
    //
    // componentDidUpdate(prevProps) {
    //     console.log('componentDidUpdate', prevProps);
    //     console.log(this.state);
    //
    //     if (prevProps.isModalActive !== this.state.isActive) {
    //         console.log("Update");
    //         this.setState({
    //             isActive: true
    //         });
    //
    //     }
    // }


    render() {
        return (
            <>
                {this.render_is_active()}
            </>
        );
    }


    render_is_active() {
        if (this.props.isActive) {
            return (
                <div
                    className="Modal-center"
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
        }
    }


    handleClick = (e) => {
        this.props.onClose();
    };

}


export default ModalCenter;