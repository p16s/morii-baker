import BasicAtom from "../../atoms/basicAtom";
import TemplateMinimal from "../../templates/minimal/minimal";
import Login from "../../organisms/login/login";


class PageMinimal extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
        });
    }


    render(className, props) {
        return (
            <>
                <TemplateMinimal>
                    <h1>Minimal template</h1>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam blanditiis culpa enim facilis id, molestias nisi optio pariatur porro reiciendis reprehenderit. Ab aliquid dolorum numquam provident quibusdam recusandae vero.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam blanditiis culpa enim facilis id, molestias nisi optio pariatur porro reiciendis reprehenderit. Ab aliquid dolorum numquam provident quibusdam recusandae vero.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam blanditiis culpa enim facilis id, molestias nisi optio pariatur porro reiciendis reprehenderit. Ab aliquid dolorum numquam provident quibusdam recusandae vero.</p>
                </TemplateMinimal>
            </>
        );
    }
}


export default PageMinimal;