import BasicAtom from "../../atoms/basicAtom";
import './default.css';
import List from "../../molecules/list/list";
import SideBar from "../../organisms/sideBar/sideBar";
import TitleBar from "../../molecules/titleBar/titleBar";
import Breadcrumbs from "../../molecules/breadcrumbs/breadcrumbs";


class TemplateDefault extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
        });
    }


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
                    header={this.props.sideBarData.header}

                    icons={this.props.sideBarData.icons}
                    options={this.props.sideBarData.options}

                    footer={(
                        <List
                            header={this.props.sideBarData.footer.list.header}
                            items={this.props.sideBarData.footer.list.items}
                        />
                    )}
                />


                <div>
                    <header>
                        <Breadcrumbs
                            breadcrumbs={this.props.breadcrumbs}
                            logo={this.props.logo}
                        />

                        {/*<TitleBar>*/}
                        {/*    <h1>[Heading as a h1]</h1>*/}
                        {/*</TitleBar>*/}
                    </header>

                    <main>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }

}


export default TemplateDefault;