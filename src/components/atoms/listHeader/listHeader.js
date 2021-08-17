import BasicAtom from "../basicAtom";
import './listHeader.css';
import {Link} from "react-router-dom";
import IconAddCircle from "../icons/add-circle";


class ListHeader extends BasicAtom {
    render(className, props) {
        return (
            <h5 className={
                "List-header"
                + this.padIfString(className)
                + this.getClassNameString()
            }>
                {this.render_content()}
            </h5>
        );
    }


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
            return this.props.header.text
        }
    }
}


export default ListHeader;