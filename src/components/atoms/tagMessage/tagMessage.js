import BasicAtom from "../basicAtom";
import './tagMessage.css';


class TagMessage extends BasicAtom {
    render(className, props) {
        return (
            <span
                className={
                    "Tag-message"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
                onClick={(e) => {
                    this.handleClick(e)
                }}
            >
                {this.props.children}
            </span>
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleClick(e) {
        this.callbackOr(this.props.onClick)(e);
    }
}


export default TagMessage;