import BasicAtom from "../../atoms/basicAtom";
import './default.css';
import List from "../../molecules/list/list";
import SideBar from "../../organisms/sideBar/sideBar";
import TitleBar from "../../molecules/titleBar/titleBar";
import Breadcrumbs from "../../molecules/breadcrumbs/breadcrumbs";
import Tag from "../../atoms/tag/tag";
import Table from "../../molecules/table/table";


class Default extends BasicAtom {
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
                        <h1>Main "Page" content here</h1>

                        <h2>Example content here, this would be passed in via the page </h2>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt doloribus expedita molestiae sunt voluptates! Consequatur corporis dolorem doloremque explicabo id iure modi quae reiciendis rerum saepe totam, vero. Aut, nisi.</p>

                        <Table
                            className={"example"}
                            thead={[
                                "Name",
                                "Sent",
                                "Open rate",
                                "Status",
                            ]}
                            tbody={[
                                [
                                    <strong>Test message</strong>,
                                    '7/14/2021, 11:10:04 AM',
                                    '100%',
                                    <Tag className="sent">Sent</Tag>
                                ],
                                [
                                    <strong>Second message</strong>,
                                    '7/14/2021, 11:10:04 AM',
                                    '100%',
                                    <Tag className="draft">Draft</Tag>
                                ],
                                [
                                    <strong>David von Dadelszen</strong>,
                                    '7/14/2021, 11:10:04 AM',
                                    '100%',
                                    <Tag className="pending">Pending</Tag>
                                ]
                            ]}
                        />
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


export default Default;