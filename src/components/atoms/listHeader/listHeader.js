import BasicAtom from "../basicAtom";
import './listHeader.css';

class ListHeader extends BasicAtom {
    render() {
        return (
            <h5 className={"ListHeader" + this.getClassNameString()}>
                {this.props.children}
            </h5>
        );
    }
}

export default ListHeader;