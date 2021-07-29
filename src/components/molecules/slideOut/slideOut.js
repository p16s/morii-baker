import BasicAtom from "../../atoms/basicAtom";
import './slideOut.css';


class SlideOut extends BasicAtom {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        }
    }


    componentDidMount() {
        this.setState({
            isActive: this.isActive = false
        });
    }


    render(className, props) {
        return (
            <section
                className={
                    "Slide-out"
                    + this.padIfString(className)
                    + this.getClassNameString()
                    + (this.isActive ? ' active' : '')
                }
            >
                <div className={"toggle-handle"}>
                    <span
                        className={( this.isActive ? 'active' : '')}
                        onClick={() => {
                            this.toggleActive();
                        }}
                    >
                        {this.props.toggleName}

                        <svg className={"icon"} width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.88 7L8.62305 -9.53674e-07L0.602235 -1.65306e-06L4.88 7Z" fill="#424E79"/>
                        </svg>
                    </span>
                </div>

                <div className={"content"}>
                    {this.props.children}
                </div>

                {/*{this.render_content()}*/}
            </section>
        );
    }


    // render_content(props) {
    //     if (this.isActive) {
    //         return (
    //             <div className={
    //                 "content "
    //                 + (this.isActive ? 'active' : '')
    //             }>
    //                 some content goes here
    //             </div>
    //         );
    //     }
    // }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    toggleActive() {
        this.setState({
            isActive: this.isActive = !this.isActive
        });
    }
}


export default SlideOut;