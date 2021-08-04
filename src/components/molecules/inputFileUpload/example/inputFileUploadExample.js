import BakerExample from "../../../../helpers/bakerExample";
import InputFileUpload from "../inputFileUpload";


class InputFileUploadExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Form Elements - File upload

                    <a
                        href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=10%3A306"}
                        target={"_blank"}
                    >
                        Components
                    </a>
                </h1>

                {this.render_normal()}
                {/*{this.render_success()}*/}
                {/*{this.render_error()}*/}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "InputFileUpload/Normal",
            <form>
                <InputFileUpload
                    forId="passed"
                    name={"Attach files"}
                />
            </form>,
            "Label and InputFileUpload atoms used together."
        );
    }


    // render_success() {
    //     return this.render_exampleComponent(
    //         "InputFileUpload/Success",
    //         <form>
    //             <InputFileUpload
    //                 for={"success"}
    //                 labelText={"Label with success"}
    //
    //                 id={"success"}
    //                 success={true}
    //                 placeholder={"Success"}
    //
    //                 message={"Success message"}
    //             />
    //         </form>,
    //         "Success"
    //     );
    // }


    // render_error() {
    //     return this.render_exampleComponent(
    //         "InputFileUpload/Error",
    //         <form>
    //             <InputFileUpload
    //                 for={"error"}
    //                 labelText={"Label with error"}
    //
    //                 id={"error"}
    //                 error={true}
    //                 placeholder={"Error"}
    //
    //                 message={"Error message"}
    //             />
    //         </form>,
    //         "Error"
    //     );
    // }
}


export default InputFileUploadExample;