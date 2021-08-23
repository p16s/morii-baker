import BakerExample from "../../../../helpers/bakerExample";
import SideBar from "../sideBar";
import List from "../../../molecules/list/list";


class SideBarExample extends BakerExample {
    constructor(props, context) {
        super(props, context);
        this.state = {
            "sideBarData": {
                "header": "Company",
                "icons": [
                    'https://app.morii.io/favicon.png'
                ],
                "options": [
                    {
                        "header": {
                            "text": 'Groups',
                            "slug": "#"
                        },
                        "items": [
                            {
                                "text": 'Group One',
                                "slug": "groups/1111/messages"
                            }
                        ]
                    }
                ],
                "footer": {
                    "list": {
                        "header": {
                            "text": "Account"
                        },
                        "items": [
                            {
                                "text": 'Settings',
                                "slug": "/settings"
                            },
                            {
                                "text": 'Logout',
                                "slug": "/logout"
                            }
                        ]
                    }
                }
            }
        };
    }



    render() {
        return (
            <section className={"examples"}>
                <h1>
                    [SideBar]

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=216%3A909"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "SideBar",
            <>
                <SideBar
                    icons={this.state.sideBarData.icons}
                    onIconClick={(e) => {
                        alert("onIconClick");
                    }}
                    onAddOrgClick={() => {
                        alert("Add org clicked");
                    }}

                    header={this.state.sideBarData.header}
                    onListHeaderClick={(e) => {
                        alert("onListHeaderClick");
                    }}

                    options={this.state.sideBarData.options}
                    onListClick={(e, list, item) => {
                        alert("onListClick");
                    }}

                    footer={(
                        <List
                            header={this.state.sideBarData.footer.list.header}
                            items={this.state.sideBarData.footer.list.items}
                            onClick={(e, index, slug) => {
                                alert("onListClick");
                            }}
                        />
                    )}
                />
            </>,
            ""
        );
    }
}


export default SideBarExample;