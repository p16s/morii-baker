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
                <File
                    fileName={value.name}
                    noRemove={true}
                    onClick={(e) => {
                        this.handleClick(index, value.name, value.location);
                    }}
                    key={"file-" + index}
                />
            );
        });
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleClick(index, name, location) {
        this.callbackOr(this.props.onClick)(index, name, location);
    }
}



export default FileList;