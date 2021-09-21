import BasicAtom from "../../atoms/basicAtom";
import './iconBar.css';
import Icon from "../../atoms/icon/icon";
import {Link} from "react-router-dom";
import IconHome from "../../atoms/icons/home";


class IconBar extends BasicAtom {
    render() {
        return (
            <div className={"Icon-bar" + this.getClassNameString()}>
                {/*add a home TODO possibly refactor this*/}
                <Icon
                    onClick={() => {
                        window.location.href = "/"
                    }}
                    active={window.location.pathname === "/"}
                >
                    <IconHome />
                </Icon>
                {this.render_icons()}
                {this.props.children}

                <aside className={"footer"}>
                    {this.props.footer}
                </aside>
            </div>
        );
    }


    render_icons() {
        return (this.props.icons ?? []).map((value, index)=>{
            return this.render_icons_icon(value, index);
        });
    }


    render_icons_icon(value, index) {
        if (typeof value === "string") {
            if (value.length === 1) {
                return (
                    <Icon
                        letter={value}
                        key={index}
                        active={(this.props.activeIcon ?? -1) === index}
                        onClick={(e) => {this.handleClick(e, index)}}
                    />
                );
            }
            return (
                <Icon
                    src={value}
                    alt={''}
                    key={index}
                    active={(this.props.activeIcon ?? -1) === index}
                    onClick={(e) => {this.handleClick(e, index)}}
                />
            );
        }

        return (
            <Icon
                key={index}
                active={(this.props.activeIcon ?? -1) === index}
                onClick={(e) => {this.handleClick(e, index)}}
            >
                {value}
            </Icon>
        );
    }


    /**
     * Handle click
     *
     * @param {MouseEvent} e
     * @param {number#} index
     */
    handleClick(e, index) {
        this.callbackOr(this.props.onClick)(e, index);
    }
}


export default IconBar;