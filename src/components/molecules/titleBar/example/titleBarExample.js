import BakerExample from "../../../../helpers/bakerExample";
import TitleBar from "../titleBar";
import Button from "../../../atoms/button/button";


class TitleBarExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Title bars

                    <a
                        href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=22%3A84"}
                        target={"_blank"}
                    >
                        Components
                    </a>
                </h1>

                {this.render_basic()}
                {this.render_icon()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent (
            'Titlebar / Default',
            <TitleBar>
                <h1>Heading as a h1</h1>
            </TitleBar>,
            'Basic title with no CTA'
        );
    }


    render_icon() {
        return this.render_exampleComponent (
            'Titlebar / Default',
            <TitleBar>
                <h2>Heading as a h2</h2>

                <Button>Dummy button</Button>
            </TitleBar>,
            'Basic title with CTA example'
        );
    }
}


export default TitleBarExample;