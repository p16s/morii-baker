import Button from "../button";
import BakerExample from "../../../helpers/bakerExample";
import Label from "../../label/label";


class ButtonExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Buttons

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=4%3A604"}
                        target={"_blank"}
                    >
                        [Documentation]
                    </a>
                </h1>

                {this.render_basic()}
                {this.render_disabled()}
                {this.render_outline()}
                {this.render_outline_disabled()}
                {this.render_minimal()}
                {this.render_minimal_disabled()}
            </section>
        )
    };


    render_basic() {
        return this.render_exampleComponent(
            'Primary / Default',
            <Button text={'Normal button'} />,
             'Default button.'
        )
    }


    render_disabled() {
        return this.render_exampleComponent(
            'Primary / Default / Disabled',
            <Button
                text={'Disabled button'}
                disabled={true}
            />,
            'Disabled button.'
        )
    }


    render_outline() {
        return this.render_exampleComponent(
            'Primary / Outline',
            <Button
                className={"outline"}
                text={'Outline button'}
            />,

            'For less important actions.'
        )
    }


    render_outline_disabled() {
        return this.render_exampleComponent(
            'Primary / Outline / Disabled',
            <Button
                text={'Disabled outline button'}
                className={"outline"}
                disabled={true}
            />,
            'Disabled button.'
        )
    }


    render_minimal() {
        return this.render_exampleComponent(
            'Primary / Minimal',
            <Button
                text={'Minimal button'}
                className={"minimal"}
            />,
            'Button without lines or background.'
        )
    }


    render_minimal_disabled() {
        return this.render_exampleComponent(
            'Primary / Minimal / Disabled',
            <Button
                text={'Minimal disbaled button'}
                className={"minimal"}
                disabled={true}
            />,
            'Button without lines or background.'
        )
    }
}



export default ButtonExample;