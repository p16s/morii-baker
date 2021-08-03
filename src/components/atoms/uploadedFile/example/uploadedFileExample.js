import BakerExample from "../../../../helpers/bakerExample";
import UploadedFile from "../uploadedFile";


class UploadedFileExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Uploaded file

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=32%3A0"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}
            </section>
        );
    }



    render_basic() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <UploadedFile
                fileName="dummy_file.pdf"
                onClick={() => {
                    alert("Click event (remove)");
                }}
            />,
            'Basic file uploaded.  WIth click event'
        );
    }
}


export default UploadedFileExample;