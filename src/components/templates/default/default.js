import BasicAtom from "../../atoms/basicAtom";
import './default.css';
import List from "../../molecules/list/list";
import SideBar from "../../organisms/sideBar/sideBar";
// import TitleBar from "../../molecules/titleBar/titleBar";
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
                        />
                    )}
                />


                <div>
                    <header className="template-header">
                        <Breadcrumbs
                            breadcrumbs={this.props.breadcrumbs}
                            logo={this.props.logo}
                        />

                        {/*<TitleBar>*/}
                        {/*    <h1>[Heading as a h1]</h1>*/}
                        {/*</TitleBar>*/}

                        <span
                            className="mobile-toggle"
                            onClick={() => {
                                this.toggleMobileNav()
                            }}
                        >
                            <IconMenu />
                        </span>
                    </header>

                    <main>
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


    toggleMobileNav() {
        console.log("TOGGLE");

        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    }

}


export default TemplateDefault;