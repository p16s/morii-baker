import BasicAtom from "../basicAtom";
import './validationMessage.css';


class ValidationMessage extends BasicAtom {
    render(className, props) {
        return (
            <p className={"Validation-message" + this.padIfString(className) + this.getClassNameString()}>
                {this.props.message}
            </p>
        );
    }
}


export default ValidationMessage;