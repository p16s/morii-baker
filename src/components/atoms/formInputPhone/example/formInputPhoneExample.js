import BakerExample from "../../../../helpers/bakerExample";
import FormInputPhone from "../formInputPhone";


class FormInputPhoneExample extends BakerExample {

    /**
     * Render the Baker Example
     * @returns {JSX.Element}
     */
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Phone input fields

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=4%3A604"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_normal()}
                {/*{this.render_error()}*/}
                {/*{this.render_success()}*/}
                {this.render_disabled()}
            </section>
        );
    }


    /**
     * Render the basic formInput titleBar.js
     * @returns {JSX.Element}
     */
    render_normal() {
        return this.render_exampleComponent(
            "InputPhone Phone/Normal",
            <form>
                <FormInputPhone
                    placeholder={"Enter phone number"}
                    value={"+44"}
                    onClick={() => {
                        console.log('click');
                    }}
                />
            </form>,
            "The basic formInputPhone field. Out of focus and empty. (click the formInput to console log)"
        );
    }


    render_error() {
        return this.render_exampleComponent(
            "InputPhone Phone/Error",
            <form>
                <FormInputPhone
                    error={true}
                    placeholder={"Error"}
                />
            </form>,
            "The content of the formInputPhone is not valid. Set the error property to true"
        );
    }


    render_success() {
        return this.render_exampleComponent(
            "InputPhone Phone/Success",
            <form>
                <FormInputPhone
                    success={true}
                    placeholder={"Success"}
                />
            </form>,
            "The content of the formInputPhone field is valid and worth showing it.  Set the success property to true"
        );
    }


    render_disabled() {
        return this.render_exampleComponent(
            "InputPhone Phone/Disabled",
            <form>
                <FormInputPhone
                    disabled={true}
                    placeholder={"Disabled"}
                />
            </form>,
            "The formInputPhone field is disabled.  Set the disabled property to true or disabled"
        );
    }
}


export default FormInputPhoneExample;