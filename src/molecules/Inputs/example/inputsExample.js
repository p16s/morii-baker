import BakerExample from "../../../helpers/bakerExample";
import Inputs from "../inputs";
import Input from "../../../atoms/input/input";


class InputsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Inputs</h1>

                {this.render_normal()}
                {this.render_success()}
                {this.render_error()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "Inputs/Normal",
            <form>
                <Inputs
                    for={"basic"}

                    id={"basic"}
                    placeholder={"Placeholder"}
                />
            </form>,
            "Label and Input atoms used together."
        );
    }


    render_success() {
        return this.render_exampleComponent(
            "Inputs/Success",
            <form>
                <Inputs
                    for={"success"}

                    id={"success"}
                    success={true}
                    placeholder={"Success"}
                />
            </form>,
            "Success"
        );
    }


    render_error() {
        return this.render_exampleComponent(
            "Inputs/Error",
            <form>
                <Inputs
                    for={"error"}

                    id={"error"}
                    error={true}
                    placeholder={"Error"}
                />
            </form>,
            "Error"
        );
    }
}


export default InputsExample;