import BakerExample from "../../../../helpers/bakerExample";
import SideBar from "../sideBar";
import List from "../../../molecules/list/list";


class SideBarExample extends BakerExample {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }


    componentDidMount() {
        this.setState({
            activeIcon: 0,
            activeList: 0,
            activeItem: 0,
        });
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
                        header={'header'}

                        icons={['a', 'b']}
                        options={
                            [
                                {
                                    header: 'Hello',
                                    items: ['One', 'Two', 'Three']
                                },
                            ]
                        }

                        footer={(
                            <List
                                header={"Account"}
                                items={['Settings', 'Logout']}
                            />
                        )}

                        activeIcon={this.state.activeIcon}
                        activeList={this.state.activeList}
                        activeItem={this.state.activeItem}

                        onItemClick={(e, list, item) => {
                            this.setState({
                                activeList: list,
                                activeItem: item,
                            })
                        }}

                        onIconClick={
                            (e, icon) => {
                                this.setState({activeIcon: icon})
                            }
                        }
                    />
                </>,
            ""
        );
    }
}


export default SideBarExample;