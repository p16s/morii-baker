import BakerExample from "../../../../helpers/bakerExample";
import InputFileUpload from "../inputFileUpload";


class InputFileUploadExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Form Elements - File upload

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
            "InputFileUpload/Normal",
            <form>
                <InputFileUpload
                    forId="passed"
                    name={"Attach files"}
                    urlGenerator={()=>{return Promise.resolve('https://morii-mail.s3.eu-west-2.amazonaws.com/testing-folder%5Ctestupload1628078095879.txt?Content-Type=text%2Fplain&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Crede\n' +
                        'ntial=AKIA2G6VLSUHVBEQFENY%2F20210804%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210804T115455Z&X-Amz-Expires=3600&X-Amz-Signature=57eca6d1bfe6c42cf61902971cd2c19547ea7063ff768e\n' +
                        '27fb93a331cdad1d9c&X-Amz-SignedHeaders=host')}}
                />
            </form>,
            "InputFileUpload with uploadedFile(s)"
        );
    }
}


export default InputFileUploadExample;