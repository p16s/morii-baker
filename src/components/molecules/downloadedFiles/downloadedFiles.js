import BasicAtom from "../../atoms/basicAtom";
import './downloadedFiles.css';
import ListItem from "../../atoms/listItem/listItem";
import UploadedFile from "../../atoms/uploadedFile/uploadedFile";


class DownloadedFiles extends BasicAtom {
    render(className, props) {
        return (
            <section
                className={
                    "Downloaded-files"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                {this.render_heading()}

                {this.render_list()}
            </section>
        );
    }


    render_heading() {
        if (this.props.heading && this.props.heading.length) {
            return <h5 className="heading">{this.props.heading}</h5>;
        }
    }


    render_list() {
        return (this.props.files ?? []).map((value, index) => {
            return (
                <UploadedFile
                    fileName={value.name}
                    noRemove={true}
                />
            );
        });
    }
}


export default DownloadedFiles;