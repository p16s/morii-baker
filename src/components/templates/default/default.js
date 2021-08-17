import BasicAtom from "../../atoms/basicAtom";
import './default.css';
import List from "../../molecules/list/list";
import SideBar from "../../organisms/sideBar/sideBar";
// import TabBar from "../../molecules/titleBar/titleBar";
import Breadcrumbs from "../../molecules/breadcrumbs/breadcrumbs";
import IconMenu from "../../atoms/icons/menu";


class TemplateDefault extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            isActive: false
        });
    }


    /**
     * main render
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <div
                className={
                    "Template-default "
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                <SideBar
                    className={(this.state.isActive ? 'active' : '')}
                    header={this.props.sideBarData.header}

                    icons={this.props.sideBarData.icons}
                    options={this.props.sideBarData.options}
                    onItemClick={(e, list, item) => {
                        this.handleItemClick(e, list, item);
                    }}

                    footer={(
                        <List
                            header={this.props.sideBarData.footer.list.header}
                            items={this.props.sideBarData.footer.list.items}
                            onClick={(e, index, slug) => {
                                this.handleListClick(e, index, slug);
                            }}
                        />
                    )}
                />


                <div className="content-container">
                    <header className="template-header">
                        <Breadcrumbs
                            breadcrumbs={this.props.breadcrumbs}
                            logo={this.props.logo}
                        />

                        {this.props.tabs}

                        {this.props.titlebar}
                        {/*<TabBar>*/}
                        {/*    <h1>[Heading as a h1]</h1>*/}
                        {/*</TabBar>*/}

                        <span
                            className="mobile-toggle"
                            onClick={() => {
                                this.toggleMobileNav()
                            }}
                        >
                            <IconMenu />
                        </span>
                    </header>

                    <main className="main">
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleItemClick(e) {
        this.callbackOr(this.props.onItemClick)(e);
    }


    /**
     * handle the click event on the footer list
     * @param e
     * @param index
     * @param slug
     */
    // TODO this is not the correct way, use the router
    handleListClick(e, index, slug) {
        if (slug && slug.length) {
            // this.context.router.push(slug);
            window.location.href = slug
        }
    }


    /**
     * mobile toggle
     */
    toggleMobileNav() {
        console.log("TOGGLE");

        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    }

}


export default TemplateDefault;