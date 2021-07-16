import Alert from "../alert";
import BakerExample from "../../../helpers/bakerExample";


class AlertExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Alerts

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=4%3A604"}
                        target={"_blank"}
                    >
                        [Documentation]
                    </a>
                </h1>

                {this.render_basic()}
            </section>
        )
    };


    render_basic() {
        return this.render_exampleComponent(
            'Alert / Info / Normal',
            <Alert />,
            'Default alert.'
        )
    }
}


export default AlertExample;