import BasicAtom from "../../atoms/basicAtom";
import './default.css';
import List from "../../molecules/list/list";
import SideBar from "../../organisms/sideBar/sideBar";
import TitleBar from "../../molecules/titleBar/titleBar";
import Breadcrumbs from "../../molecules/breadcrumbs/breadcrumbs";
import Tag from "../../atoms/tag/tag";
import Table from "../../molecules/table/table";


class TemplateDefault extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            // sideBarData: null,
            "sideBarData": {
                "header": "Header",
                "icons": ['a', 'b'],
                "options": [
                    {
                        "header": 'First',
                        "items": ['One', 'Two', 'Three']
                    },
                    {
                        "header": 'Second',
                        "items": ['One', 'Two', 'Three']
                    }
                ],
                "footer": {
                    "list": {
                        "header": "Account",
                        "items": ['Settings', 'Logout']
                    }
                }
            },
            breadcrumbData: null
        });
    }


    render(className, props) {
        return (
            <div className="page Default-template">
                <SideBar
                    header={this.state.sideBarData.header}

                    icons={this.state.sideBarData.icons}
                    options={this.state.sideBarData.options}

                    footer={(
                        <List
                            header={this.state.sideBarData.footer.list.header}
                            items={this.state.sideBarData.footer.list.items}
                        />
                    )}
                />


                <div>
                    <header>
                        <Breadcrumbs
                            breadcrumbs={this.state.breadcrumbData}
                            logo={'https://app.morii.io/favicon.png'}
                        />

                        <TitleBar>
                            <h1>Heading as a h1</h1>
                        </TitleBar>
                    </header>

                    <main>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }


    componentDidMount() {
        //  mock getting/setting sidebar data
        // this.setState({
        //     "sideBarData": {
        //         "header": "Header",
        //         "icons": ['a', 'b'],
        //         "options": [
        //             {
        //                 "header": 'First',
        //                 "items": ['One', 'Two', 'Three']
        //             },
        //             {
        //                 "header": 'Second',
        //                 "items": ['One', 'Two', 'Three']
        //             }
        //         ],
        //         "footer": {
        //             "list": {
        //                 "header": "Account",
        //                 "items": ['Settings', 'Logout']
        //             }
        //         }
        //     }
        // });

        //  mock getting/setting breadcrumb data
        this.setState({
            "breadcrumbData": [
                {
                    "title": "Purposeful Ventures",
                    "slug": "https://p16s.co/morii/"
                },
                {
                    "title": "Stakeholders",
                    "slug": "https://p16s.co/morii/"
                },
                {
                    "title": "Add",
                }
            ]
        });
    }
}


export default TemplateDefault;