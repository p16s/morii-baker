import BakerExample from "../../../helpers/bakerExample";
import Inputs from "../inputs";


class InputsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Form Elements - Inputs

                    <a
                        href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=10%3A306"}
                        target={"_blank"}
                    >
                        Components
                    </a>
                </h1>

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
                    labelText={"Label"}

                    id={"basic"}
                    value={"Value passed"}
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
                    labelText={"Label with success"}

                    id={"success"}
                    success={true}
                    placeholder={"Success"}

                    message={"Success message"}
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
                    labelText={"Label with error"}

                    id={"error"}
                    error={true}
                    placeholder={"Error"}

                    message={"Error message"}
                />
            </form>,
            "Error"
        );
    }
}


export default InputsExample;