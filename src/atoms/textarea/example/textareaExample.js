import BakerExample from "../../../helpers/bakerExample";
import Textarea from "../textarea";


class TextareaExample extends BakerExample {

    /**
     * Render the Baker Example
     * @returns {JSX.Element}
     */
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Textarea

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=4%3A604"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_normal()}
                {this.render_error()}
                {this.render_success()}
                {this.render_disabled()}
                {this.render_large()}
            </section>
        );
    }


    /**
     * Render the basic formInput example
     * @returns {JSX.Element}
     */
    render_normal() {
        return this.render_exampleComponent(
            "Textarea/Normal",
            <form>
                <Textarea
                    onClick={() => {console.log('click');}}
                />
            </form>,
            "The basic textarea field. Out of focus and empty. (click the formInput to console log)"
        );
    }

    render_error() {
        return this.render_exampleComponent(
            "Textarea/Error",
            <form>
                <Textarea
                    error={true}
                />
            </form>,
            "The content of the textarea is not valid. Set the error property to true"
        );
    }

    render_success() {
        return this.render_exampleComponent(
            "Textarea/Success",
            <form>
                <Textarea
                    success={true}
                />
            </form>,
            "The content of the textarea is valid and worth showing it.  Set the success property to true"
        );
    }

    render_disabled() {
        return this.render_exampleComponent(
            "Textarea/Disabled",
            <form>
                <Textarea
                    disabled={true}
                />
            </form>,
            "The textarea field is disabled.  Set the disabled property to true or disabled"
        );
    }

    render_large() {
        return this.render_exampleComponent(
            "Textarea/Large",
            <form>
                <Textarea
                    className={"large"}
                />
            </form>,
            "Modifier class of `large`"
        );
    }
}


export default TextareaExample;