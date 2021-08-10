import BasicAtom from "../../atoms/basicAtom";
import TemplateMinimal from "../../templates/minimal/minimal";


class PageMinimal extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
        });
    }


    render(className, props) {
        return (
            <>
                <TemplateMinimal>

                    <h1>Some content</h1>
                </TemplateMinimal>
            </>
        );
    }
}


export default PageMinimal;