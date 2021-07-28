import BasicAtom from "../basicAtom";
import './tag.css';


class Tag extends BasicAtom {
    render(className, props) {
        return (
            <span
                className={"Tag"
                + this.padIfString(className)
                + this.getClassNameString()}
            >
                {this.props.children}
            </span>
        );
    }
}


export default Tag;