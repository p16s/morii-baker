import BasicAtom from "../../atoms/basicAtom";
import TemplateMinimal from "../../templates/minimal/minimal";


class PageMinimal extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            fileList: []
        });
    }


    render(className, props) {
        return (
            <>
                <TemplateMinimal>

                    <input
                        id="testingit"
                        type="file"
                        onChange={(e) => {
                            console.log("onChange", e.target.files);
                            this.addToList(e.target.files);
                        }}
                        multiple
                    />
                    {/*{this.render_upload_list()}*/}

                    <h1>Minimal template</h1>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam blanditiis culpa enim facilis id, molestias nisi optio pariatur porro reiciendis reprehenderit. Ab aliquid dolorum numquam provident quibusdam recusandae vero.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam blanditiis culpa enim facilis id, molestias nisi optio pariatur porro reiciendis reprehenderit. Ab aliquid dolorum numquam provident quibusdam recusandae vero.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam blanditiis culpa enim facilis id, molestias nisi optio pariatur porro reiciendis reprehenderit. Ab aliquid dolorum numquam provident quibusdam recusandae vero.</p>
                </TemplateMinimal>
            </>
        );
    }

    render_upload_list() {
        return this.state.fileList.map((file, index) => {
            return (
                <p>File: {file}</p>
            );
        });
    }


    addToList(file) {
        const newList = [...this.state.fileList];

        newList.push(file);

        this.setState({
            fileList: newList
        });
    }
}


export default PageMinimal;