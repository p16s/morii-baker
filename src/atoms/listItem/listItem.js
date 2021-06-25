import './listItem.css';
import BasicAtom from "../basicAtom";

class ListItem extends BasicAtom {
    render() {
        return (
            <div
                className={
                    "ListItem"
                    + (this.isActive() ? ' active' : '')
                    + (this.isClickable() ? ' clickable' : '')
                    + this.getClassNameString()
                }
                onClick={(e) => {
                    this.handleClick(e)
                }}
            >
                {this.props.children}
            </div>
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

export default ListItem;