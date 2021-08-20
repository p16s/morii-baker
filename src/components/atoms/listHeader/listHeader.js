import BasicAtom from "../basicAtom";
import './listHeader.css';
import {Link} from "react-router-dom";
import IconAddCircle from "../icons/add-circle";


class ListHeader extends BasicAtom {
    /**
     * main render
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <h5
                className={
                    "List-header"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
                onClick={(e) => { this.handleClick(e)}}
            >
                {this.render_content()}
            </h5>
        );
    }


    /**
     * list header, if there's a slug passed wrap in a link
     * @returns {JSX.Element|*}
     */
    render_content() {
        if (this.props.header.slug && this.props.header.slug.length) {
            return (
                <Link
                    to={this.props.header.slug}
                    title={"Go to " + this.props.header.text}
                >
                    {this.props.header.text}

                    <IconAddCircle />
                </Link>
            );
        } else {
            return this.props.header.text;
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleClick(e) {
        this.callbackOr(this.props.onClick)(e);
    }
}


export default ListHeader;