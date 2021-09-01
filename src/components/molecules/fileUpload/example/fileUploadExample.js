import BakerExample from "../../../../helpers/bakerExample";
import FileUpload from "../fileUpload";


class FileUploadExample extends BakerExample {
    /**
     * main render
     * @returns {JSX.Element}
     */
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    File upload

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
            "FileUpload/Normal",
            <form>
                <FileUpload
                    forId="passed"
                    name={"Attach files"}
                    urlGenerator={() => {
                        return Promise.resolve('http://localhost:3001/upload?fail=0')
                    }}
                    onRemove={(file) => {
                        console.log("file removed: ", file);
                    }}
                    onError={(error) => {
                        console.log('Problem uploading file: ', error);
                    }}
                />
            </form>,
            "FileUpload with file(s)"
        );
    }
}


export default FileUploadExample;