import BakerExample from "../../../../helpers/bakerExample";
import FormInput from "../formInput";


class FormInputExample extends BakerExample {

    /**
     * Render the Baker Example
     * @returns {JSX.Element}
     */
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Input fields

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
            "Input/Normal",
            <form>
                <FormInput
                    placeholder={"Placeholder"}
                    onClick={() => {console.log('click');}}
                />
            </form>,
            "The basic formInput field. Out of focus and empty. (click the formInput to console log)"
        );
    }

    render_error() {
        return this.render_exampleComponent(
            "Input/Error",
            <form>
                <FormInput
                    error={true}
                    placeholder={"Error"}
                />
            </form>,
            "The content of the form is not valid. Set the error property to true"
        );
    }

    render_success() {
        return this.render_exampleComponent(
            "Input/Success",
            <form>
                <FormInput
                    success={true}
                    placeholder={"Success"}
                />
            </form>,
            "The content of the formInput field is valid and worth showing it.  Set the success property to true"
        );
    }

    render_disabled() {
        return this.render_exampleComponent(
            "Input/Disabled",
            <form>
                <FormInput
                    disabled={true}
                    placeholder={"Disabled"}
                />
            </form>,
            "The formInput field is disabled.  Set the disabled property to true or disabled"
        );
    }

    render_large() {
        return this.render_exampleComponent(
            "Input/Large",
            <form>
                <FormInput
                    className={"large"}
                    placeholder={"Large text"}
                />
            </form>,
            "Modifier class of `large`"
        );
    }
}

export default FormInputExample;