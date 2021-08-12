import BasicAtom from "../../atoms/basicAtom";
import TemplateMinimal from "../../templates/minimal/minimal";
import Login from "../../organisms/login/login";
import "./login.css";


class PageLogin extends BasicAtom {
    constructor(props, context) {
        super(props, context, {});
    }


    render(className, props) {
        return (
                <TemplateMinimal className="page-login">
                    <Login />
                </TemplateMinimal>
        );
    }
}


export default PageLogin;