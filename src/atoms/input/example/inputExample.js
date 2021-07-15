import BakerExample from "../../../helpers/bakerExample";
import Input from "../input";


class InputExample extends BakerExample {

    /**
     * Render the Baker Example
     * @returns {JSX.Element}
     */
    render() {
        return (
            <section className={"examples"}>
                <h1>Input fields</h1>

                {this.render_normal()}
                {this.render_success()}
                {this.render_error()}
                {this.render_disabled()}
            </section>
        );
    }

    /**
     * Render the basic input example
     * @returns {JSX.Element}
     */
    render_normal() {
        return this.render_exampleComponent(
            "Input / Normal",
            <form>
                <Input
                    placeholder={"Placeholder"}
                    onClick={() => {console.log('click');}}
                />
            </form>,
            "The basic input field. Out of focus and empty. (click the input to console log)"
        );
    }

    render_success() {
        return this.render_exampleComponent(
            "Input / Success",
            <form>
                <Input success={true} />
            </form>,
            "The content of the input field is valid and worth showing it.  Set the success property to true"
        );
    }

    render_error() {
        return this.render_exampleComponent(
            "Input / Error",
            <form>
                <Input error={true} />
            </form>,
            "The content of the form is not valid. Set the error property to true"
        );
    }

    render_disabled() {
        return this.render_exampleComponent(
            "Input / Disabled",
            <form>
                <Input disabled={true} />
            </form>,
            "The input field is disabled.  Set the disabled property to true or disabled"
        );
    }
}

export default InputExample;