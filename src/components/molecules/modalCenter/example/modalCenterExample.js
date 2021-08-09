import BakerExample from "../../../../helpers/bakerExample";
import ModalCenter from "../modalCenter";
import Button from "../../../atoms/button/button";


class ModalCenterExample extends BakerExample {
    constructor(props) {
        super(props);

        this.state = {
            isModalActive: false
        }
    }


    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Modals - Center

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=41%3A3350"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Modal / Center',
            <>
                <ModalCenter
                    isActive={this.state.isModalActive}
                    onClose={() => {
                        this.setState({
                            isModalActive: false
                        })
                    }}
                >
                    <h1>Modal heading</h1>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur, doloremque est fuga id iusto libero minus molestiae natus optio praesentium provident, quam rerum sint, tempora tempore temporibus! Magni.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur, doloremque est fuga id iusto libero minus molestiae natus optio praesentium provident, quam rerum sint, tempora tempore temporibus! Magni.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur, doloremque est fuga id iusto libero minus molestiae natus optio praesentium provident, quam rerum sint, tempora tempore temporibus! Magni.</p>
                </ModalCenter>


                <Button
                    onClick={() => {
                        this.setState({
                            isModalActive: true
                        })
                    }}
                >
                    Click to show modal
                </Button>
            </>,
            'Basic center modal, with ready to go close/CTAs'
        );
    }
}


export default ModalCenterExample;
