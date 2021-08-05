import BasicAtom from "../../atoms/basicAtom";
import './fileList.css';
import File from "../../atoms/file/file";


class FileList extends BasicAtom {
    render(className, props) {
        return (
            <section
                className={
                    "File-list"
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
                <a
                    href={(value.url ? value.url : '#')}
                    title={"Click to download " + value.name}
                    target="_blank"
                    rel="nofollow noopener"
                    key={"file-" + index}
                >
                    <File
                        fileName={value.name}
                        noRemove={true}
                    />
                </a>
            );
        });
    }
}


export default FileList;