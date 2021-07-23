import BakerExample from "../../../helpers/bakerExample";
import FormTextarea from "../formTextarea";


class FormTextareaExample extends BakerExample {

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
            "FormTextarea/Normal",
            <form>
                <FormTextarea
                    onClick={() => {console.log('click');}}
                />
            </form>,
            "The basic formTextarea field. Out of focus and empty. (click the formInput to console log)"
        );
    }

    render_error() {
        return this.render_exampleComponent(
            "FormTextarea/Error",
            <form>
                <FormTextarea
                    error={true}
                />
            </form>,
            "The content of the formTextarea is not valid. Set the error property to true"
        );
    }

    render_success() {
        return this.render_exampleComponent(
            "FormTextarea/Success",
            <form>
                <FormTextarea
                    success={true}
                />
            </form>,
            "The content of the formTextarea is valid and worth showing it.  Set the success property to true"
        );
    }

    render_disabled() {
        return this.render_exampleComponent(
            "FormTextarea/Disabled",
            <form>
                <FormTextarea
                    disabled={true}
                />
            </form>,
            "The formTextarea field is disabled.  Set the disabled property to true or disabled"
        );
    }

    render_large() {
        return this.render_exampleComponent(
            "FormTextarea/Large",
            <form>
                <FormTextarea
                    className={"large"}
                />
            </form>,
            "Modifier class of `large`"
        );
    }
}


export default FormTextareaExample;