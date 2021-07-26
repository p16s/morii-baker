import BasicAtom from "../../atoms/basicAtom";
import ListHeader from "../../atoms/listHeader/listHeader";
import ListItem from "../../atoms/listItem/listItem";
import './list.css';


class List extends BasicAtom {
    render() {
        return (
            <>
                {this.render_header()}

                <ul className={"List"}>
                    {this.render_items()}
                    {this.props.children}
                </ul>
            </>
        );
    }


    /**
     * render items
     *
     * @return {unknown[]}
     */
    render_items() {
        return (this.props.items ?? []).map((value, index) => {
            return (
                <ListItem
                    key={index}
                    active={(this.props.activeItem ?? -1) === index}
                    onClick={(e) => {this.handleClick(e, index)}}
                >
                    {value}
                </ListItem>
            );
        })
    }


    /**
     * Render the header
     * @return {JSX.Element|string}
     */
    render_header() {
        return (typeof this.props.header !== 'undefined')
            ?
            (
                <ListHeader>
                    {this.props.header}
                </ListHeader>
            )
            : ('');
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

export default List;