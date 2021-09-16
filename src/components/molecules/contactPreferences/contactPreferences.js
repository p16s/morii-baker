import BasicAtom from "../../atoms/basicAtom";
import "./contactPreferences.css"
import Toggle from "../../atoms/toggle/toggle";
import Label from "../../atoms/label/label";


class ContactPreferences extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            sms: true,
            email: false,
            whatsapp: false
        });
    }

    static defaultProps = {
        label: "Where do you want to get notifications?"
    }


    componentDidMount() {
        super.componentDidMount();

        this.setState({
            sms: (this.props.default ?? {}).sms ?? false,
            email: (this.props.default ?? {}).email ?? false,
            whatsapp: (this.props.default ?? {}).whatsapp ?? false
        });
    }


    render(className, props) {
        return (
            <div
                className={
                    "Contact-preferences "
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                {this.render_label()}

                <Toggle
                    label={(this.state.sms ? "SMS" : "SMS")}
                    value={this.state.sms}
                    onChange={() => {
                        this.toggle('sms');
                    }}
                />

                <Toggle
                    label={(this.state.whatsapp ? "Whatsapp" : "Whatsapp")}
                    value={this.state.whatsapp}
                    onChange={() => {
                        this.toggle('whatsapp');
                    }}
                />

                <Toggle
                    label={(this.state.email ? "Email" : "Email")}
                    value={this.state.email}
                    onChange={() => {
                        this.toggle('email');
                    }}
                />
            </div>
        );
    }


    render_label() {
        if (this.props.label && this.props.label.length) {
            return (

                <Label>{this.props.label}</Label>
            );
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Toggle SMS
     *
     * @param {MouseEvent} e
     */
    toggle(toToggle, state) {
        this.setState( {
            [toToggle]: state ?? !this.state[toToggle]
        },
            () => {
                this.callbackOr(this.props.onChange)(
                    {
                        sms: this.state.sms,
                        email: this.state.email,
                        whatsapp: this.state.whatsapp,
                    }
                );
            }
        );
    }
}


export default ContactPreferences;