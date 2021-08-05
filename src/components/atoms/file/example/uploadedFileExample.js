import BakerExample from "../../../../helpers/bakerExample";
import File from "../file";


class UploadedFileExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    File

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=32%3A0"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}
                {this.render_no_remove()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <File
                fileName="dummy_file.pdf"
                onClick={() => {
                    alert("Click event (remove etc)");
                }}
            />,
            'Basic file.  With click event'
        );
    }


    render_no_remove() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <File
                fileName="dummy_file.pdf"
                noRemove={true}
                onClick={() => {
                    alert("Click event (remove etc)");
                }}
            />,
            'Basic file.  With no remove'
        );
    }
}


export default UploadedFileExample;