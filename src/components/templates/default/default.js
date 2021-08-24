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

    static defaultProps = {
        "sideBarData": {
            "header": "",
            "icons": [],
            "options": [],
            "footer": {
                "list": {
                    "header": '',
                    "items": []
                }
            }
        },
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

                    icons={this.props.sideBarData.icons}
                    onIconClick={(e) => {
                        alert("onIconClick");
                    }}
                    onAddOrgClick={() => {
                        alert("Add org clicked");
                    }}

                    header={this.props.sideBarData.header}
                    onListHeaderClick={(e) => {
                        this.handleListHeaderClick(e);
                    }}

                    options={this.props.sideBarData.options}
                    onListClick={(e, list, item) => {
                        this.handleListClick(e, list, item);
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
     * handle the click event
     * @param e
     * @param index
     */
    handleListHeaderClick(e, index) {
        this.callbackOr(this.props.onListHeaderClick)(e);
    }

    /**
     * handle the click event
     * @param e
     * @param index
     */
    handleListClick(e, index) {
        this.callbackOr(this.props.onListClick)(e);
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