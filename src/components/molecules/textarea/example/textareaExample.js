import BakerExample from "../../../../helpers/bakerExample";
import Textarea from "../textarea";


class TextareaExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Form Elements - Textareas

                    <a
                        href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=31%3A0"}
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
            "Textarea/Normal",
            <form>
                <Textarea
                    for={"basic"}
                    labelText={"Label"}

                    id={"basic"}
                    placeholder={"Placeholder"}
                />
            </form>,
            "Label and Pin atoms used together."
        );
    }


    render_success() {
        return this.render_exampleComponent(
            "Textarea/Success",
            <form>
                <Textarea
                    for={"success"}
                    labelText={"Label with success"}

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
            "Textarea/Error",
            <form>
                <Textarea
                    for={"error"}
                    labelText={"Label with error"}

                    id={"error"}
                    error={true}
                    placeholder={"Error"}
                />
            </form>,
            "Error"
        );
    }
}


export default TextareaExample;