import Toggle from "../toggle";
import BakerExample from "../../../helpers/bakerExample";


class ToggleExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Toggles

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=32%3A0"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_basic()}
            </section>
        );
    }


    render_basic() {
        return (
            <Toggle />
        );
    }
}


export default ToggleExample;