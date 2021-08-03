import BasicAtom from "../basicAtom";
import './listItem.css';


class ListItem extends BasicAtom {
    render(className, props) {
        return (
            <li
                className={
                    "List-item"
                    + this.padIfString(className)
                    + this.getClassNameString()
                    + (this.isActive() ? ' active' : '')
                    // + (this.isClickable() ? ' clickable' : ' disabled')
                }
                onClick={(e) => {
                    this.handleClick(e)
                }}
            >
                {this.props.children}
            </li>
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