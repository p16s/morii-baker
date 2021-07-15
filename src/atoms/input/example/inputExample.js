import BakerExample from "../../../helpers/bakerExample";
import Input from "../input";


class InputExample extends BakerExample {

    /**
     * Render the Baker Example
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className={"examples"}>
                <h1>Input</h1>
                <h2>Overview</h2>
                <p>The input has the following states...</p>
                {this.render_normal()}
                {this.render_success()}
                {this.render_error()}
                {this.render_disabled()}
            </div>
        );
    }

    /**
     * Render the basic input example
     * @returns {JSX.Element}
     */
    render_normal() {
        return this.render_exampleComponent(
            "Normal",
            <form>
                <Input onClick={() => {console.log('click');}} />
            </form>,
            "This is the basic input component the onClick property can be used (click the input to console log"
        );
    }

    render_success() {
        return this.render_exampleComponent(
            "Success",
            <form>
                <Input success={true} />
            </form>,
            "Set the success property to true"
        );
    }

    render_error() {
        return this.render_exampleComponent(
            "Error",
            <form>
                <Input error={true} />
            </form>,
            "Set the error property to true"
        );
    }

    render_disabled() {
        return this.render_exampleComponent(
            "Disabled",
            <form>
                <Input disabled={true} />
            </form>,
            "Set the disabled property to true or disabled"
        );
    }
}

export default InputExample;