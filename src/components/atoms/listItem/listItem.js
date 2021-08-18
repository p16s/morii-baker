import BasicAtom from "../basicAtom";
import './listItem.css';
import {Link} from "react-router-dom";


class ListItem extends BasicAtom {
    /**
     * set some default props
     * @type {{list: string}}
     */
    static defaultProps = {
        list: ''
    }


    /**
     * main render
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <li
                className={
                    "List-item"
                    + this.padIfString(className)
                    + this.getClassNameString()
                    + (this.isActive() ? ' active' : '')
                    + (this.isDisabled ? ' disabled' : '')
                }
                onClick={(e) => {
                    this.handleClick(e)
                }}
            >
                {this.render_content()}

                {this.props.children}
            </li>
        );
    }


    /**
     * list, if there's a slug passed wrap in a link
     * @returns {JSX.Element|*}
     */
    render_content() {
        if (this.props.list.slug && this.props.list.slug.length) {
            return (
                <Link
                    to={this.props.list.slug}
                    title={"Go to " + this.props.list.text}
                >
                    {this.props.list.text}
                </Link>
            );
        } else {
            return this.props.list.text;
        }
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