import BasicAtom from "../../atoms/basicAtom";
import IconBar from "../../molecules/iconBar/iconBar";
import List from "../../molecules/list/list";
import './sideBar.css';
import {Link} from "react-router-dom";
import IconHome from "../../atoms/icons/home";


class SideBar extends BasicAtom {
    /**
     * main render
     * @returns {JSX.Element}
     */
    render() {
        const icons = [];

        this.props.icons.forEach((val) => {
            icons.push(val.icon);
        });

        return (
            <div className={"Side-bar" + this.getClassNameString()}>
                <IconBar
                    icons={icons}
                    activeIcon={this.props.activeIcon ?? null}
                    // footer={(
                    //     <Button
                    //         onClick={() => {
                    //             this.handleAddOrgClick();
                    //         }}
                    //         className={"secondary round"}>
                    //         <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //             <path d="M9.2079 6.10571H5.95076V9.57714H4.03076V6.10571H0.790759V4.38286H4.03076V0.92H5.95076V4.38286H9.2079V6.10571Z" fill="white"/>
                    //         </svg>
                    //     </Button>
                    // )}
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
                activeItem={this.props.activeList}
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

    /**
     * handle list header click
     * @param e
     * @param list
     * @param item
     */
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


    /**
     * add org cta
     */
    handleAddOrgClick(e) {
        this.callbackOr(this.props.onAddOrgClick)(e);
    }
}


export default SideBar;