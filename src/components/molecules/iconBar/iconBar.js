import BasicAtom from "../../atoms/basicAtom";
import './iconBar.css';
import Icon from "../../atoms/icon/icon";

class IconBar extends BasicAtom {
    render() {
        return (
            <div className={"IconBar" + this.getClassNameString()}>
                {this.render_icons()}
                {this.props.children}
            </div>
        )
    }

    render_icons() {
        return (this.props.icons ?? []).map((value, index)=>{
            return this.render_icons_icon(value, index);
        });
    }

    render_icons_icon(value, index) {
        if (typeof value === "string") {
            if (value.length === 1) {
                return (<Icon
                    letter={value}
                    key={index}
                    onClick={(e) => {this.handleClick(e, index)}}
                    active={(this.props.activeIcon ?? -1) === index}
                />);
            }
            return (
                <Icon
                    src={value}
                    alt={''}
                    key={index}
                    onClick={(e) => {this.handleClick(e, index)}}
                    active={(this.props.activeIcon ?? -1) === index}
                />
            );
        }

        return <Icon
            key={index}
            onClick={(e) => {this.handleClick(e, index)}}
            active={(this.props.activeIcon ?? -1) === index}
        >
            {value}
        </Icon>;
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