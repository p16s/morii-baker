import BasicAtom from "../../atoms/basicAtom";
import './minimal.css';
import IconPurposefulLogo from "../../atoms/icons/purposeful-logo";


class TemplateMinimal extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
        });
    }


    render(className, props) {
        return (
            <div
                className={
                    "Template-minimal"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                {
                    this.props.isLoginScreen
                        ?
                            <h1>initial login</h1>
                        :
                            <header className="header">
                                <IconPurposefulLogo />

                                <a
                                    href="mailto:support@p16s.co?subject=Account issue"
                                    title="Contact support"
                                >
                                    Contact support
                                </a>
                            </header>

                }

                <main className="main">
                    {this.props.children}
                </main>
            </div>
        );
    }
}


export default TemplateMinimal;
