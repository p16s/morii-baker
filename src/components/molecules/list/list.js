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
     * Render the header
     * @return {JSX.Element|string}
     */
    render_header() {
        return (typeof this.props.header !== 'undefined' && (this.props.header ?? {text: ''}).text !== '')
            ?
            (
                <ListHeader
                    header={this.props.header}
                    onClick={(e) => this.handleListHeaderClick(e)}
                />
            )
            : ('');
    }


    /**
     * render items
     *
     * @return {unknown[]}
     */
    render_items() {
        return (
            this.props.items ?? []).map((list, index) => {
                return (
                    <ListItem
                        list={list}
                        key={index}
                        active={(this.props.activeItem ?? -1) === index}
                        onClick={(e) => {this.handleListClick(e, index)}}
                    >
                        {/*{list.text}*/}
                    </ListItem>
                );
           }
       );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleListHeaderClick(e) {
        this.callbackOr(this.props.onListHeaderClick)(e);
    }

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     * @param {number#} index
     */
    handleListClick(e, index) {
        this.callbackOr(this.props.onListClick)(e, index);
    }
}


export default List;