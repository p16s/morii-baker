import BasicAtom from "../../atoms/basicAtom";
import IconBar from "../../molecules/iconBar/iconBar";
import List from "../../molecules/list/list";
import './sideBar.css';


class SideBar extends BasicAtom {
    /**
     * main render
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className={"Side-bar" + this.getClassNameString()}>
                <IconBar
                    icons={this.props.icons}
                    activeIcon={this.props.activeIcon ?? null}
                    onClick={(e, key) => {this.handleIconClick(e, key);}}
                />

                <nav className={"options"}>
                    {this.render_header()}

                    {this.render_lists()}

                    {this.props.children}

                    <div className={"footer"}>
                        {this.props.footer}
                    </div>
                </nav>
            </div>
        );
    }

    /**
     * main side bar header
     * @returns {JSX.Element|*|string}
     */
    render_header() {
        return (typeof this.props.header !== 'undefined')
            ? (
                (typeof this.props.header === 'string')
                    ? (<h1>{this.props.header}</h1>)
                    : this.props.header
            )
            : ('');
    }


    /**
     * map/iterate the array
     * @returns {JSX.Element[]}
     */
    render_lists() {
        return (this.props.lists ?? this.props.options ?? []).map((list, index) => {
            return this.render_list(list, index)
        });
    }


    /**
     * render the list
     * @param list
     * @param index
     * @returns {JSX.Element}
     */
    render_list(list, index) {
        return (
            <List
                header={list.header}
                items={list.items}
                activeItem={((this.props.activeList ?? null) === index) ? (this.props.activeItem ?? null) : null }
                key={index}
                onListHeaderClick={(e, key) => {
                    this.handleListHeaderClick(e, index, key);
                }}
                onListClick={(e, key) => {
                    this.handleListClick(e, index, key);
                }}
            />
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleListHeaderClick(e, list, item) {
        this.callbackOr(this.props.onListHeaderClick)(e, list, item);
    }

    /**
     * Handle item click
     *
     * @param {MouseEvent} e
     */
    handleListClick(e, list, item) {
        this.callbackOr(this.props.onListClick)(e, list, item);
    }


    /**
     * Handle icon click
     *
     * @param {MouseEvent} e
     */
    handleIconClick(e, index) {
        this.callbackOr(this.props.onIconClick)(e, index);
    }
}


export default SideBar;