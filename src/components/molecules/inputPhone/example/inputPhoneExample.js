import BakerExample from "../../../../helpers/bakerExample";
import InputPhone from "../inputPhone";


class InputPhoneExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Form Elements - Input with phone

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=10%3A306"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Components*/}
                    {/*</a>*/}
                </h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "InputPhone/Normal",
            <form>
                <InputPhone
                    for={"basic"}
                    labelText={"Phone number (label)"}

                    id={"basic"}
                    value={"+44"}
                    placeholder={"Enter phone number"}
                />
            </form>,
            "Label and InputPhone atoms used together."
        );
    }
}


export default InputPhoneExample;