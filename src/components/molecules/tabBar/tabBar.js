import BasicAtom from "../../atoms/basicAtom";
import './tabBar.css';
import Tab from "../../atoms/tab/tab";


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