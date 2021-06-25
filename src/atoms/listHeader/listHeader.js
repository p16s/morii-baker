import BasicAtom from "../basicAtom";
import './listHeader.css';

class ListHeader extends BasicAtom {
    render() {
        return (
            <div className={"ListHeader" + this.getClassNameString()}>
                {this.props.children}
            </div>
        );
    }
}

export default ListHeader;