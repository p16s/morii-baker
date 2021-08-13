import BasicAtom from "../../atoms/basicAtom";
import IconBar from "../../molecules/iconBar/iconBar";
import List from "../../molecules/list/list";
import './sideBar.css';


class SideBar extends BasicAtom {
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


    render_header() {
        return (typeof this.props.header !== 'undefined')
            ? (
                (typeof this.props.header === 'string')
                    ? (<h1>{this.props.header}</h1>)
                    : this.props.header
            )
            : ('');
    }


    render_lists() {
        return (this.props.lists ?? this.props.options ?? []).map((list, index) => {
            return this.render_list(list, index)
        });
    }


    render_list(list, index) {
        return (
            <List
                header={list.header}
                items={list.items}
                activeItem={((this.props.activeList ?? null) === index) ? (this.props.activeItem ?? null) : null }
                key={index}
                onClick={(e, key) => {this.handleItemClick(e, index, key);}}
            />
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle item click
     *
     * @param {MouseEvent} e
     */
    handleItemClick(e, list, item) {
        this.callbackOr(this.props.onItemClick)(e, list, item);
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