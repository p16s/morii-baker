import BakerExample from "../../../../helpers/bakerExample";
import DownloadedFiles from "../downloadedFiles";


class DownloadedFilesExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Downloaded files

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
            "Downloaded Files/Normal",
            <DownloadedFiles
                heading="Heading passed"
                files={[
                    {
                        "name": "filename1.jpg"
                    },
                    {
                        "name": "filename2.jpg"
                    },
                    {
                        "name": "filename3.jpg"
                    }
                ]}
            />,
            "Container for showing files downloaded"
        );
    }
}


export default DownloadedFilesExample;