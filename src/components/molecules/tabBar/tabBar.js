import BasicAtom from "../../atoms/basicAtom";
import './tabBar.css';


class TabBar extends BasicAtom {
    render(className, props) {
        return (
            <nav
                className={
                    "Tab-bar "
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                {this.props.children}
            </nav>
        );
    }
}


export default TabBar;