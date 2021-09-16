import { Editor } from '@tinymce/tinymce-react';
import BasicAtom from "../atoms/basicAtom";
import "./wysiwyg.css";


class Wysiwyg extends BasicAtom {
    render() {
        return (
            <div
                className={
                    'Wysiwyg'
                }
            >
                <Editor
                    initialValue={this.props.content ?? ''}
                    apiKey={"5qnz6f1ucl0mznhjzd3qaxoabsium0nqgwo5fxd6hm8jpx49"}
                    outputFormat={'html'}
                    init={{
                        browser_spellcheck : true,
                        plugins: [
                            'table',
                            'lists',
                            'link',
                            'emoticons'
                        ],
                        menubar: 'insert table',
                        visual : false,
                        branding:false,
                        statusbar: false,
                        themes: "modern",
                        directionality : "ltr",
                        height: "100%",
                        toolbar: "styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor | link | emoticons"
                    }}
                    onEditorChange={(change)=> {
                        if (typeof this.props.onChange !== 'undefined') {
                            this.props.onChange(change);
                        }
                    }}
                />
            </div>

        );
    }
}

export default Wysiwyg;