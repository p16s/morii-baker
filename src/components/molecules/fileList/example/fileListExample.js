import BakerExample from "../../../../helpers/bakerExample";
import FileList from "../fileList";


class FileListExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    File List

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=22%3A723"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "FileList/Normal",
            <FileList
                heading="Heading passed"
                files={[
                    {
                        "name": "filename1.jpg",
                        "url": "http://download.inspire.net.nz/data/5MB.zip"
                    },
                    {
                        "name": "filename2.jpg",
                        "url": "/"
                    },
                    {
                        "name": "filename3.jpg",
                        "url": "/"
                    }
                ]}
            />,
            "Container for files, with heading"
        );
    }
}


export default FileListExample;