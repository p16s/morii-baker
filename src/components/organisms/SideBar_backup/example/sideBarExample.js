import React from "react";
import SideBar from "../sideBar";
import List from "../../../molecules/list/list";

class SideBarExample extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.setState({
            activeIcon: 0,
            activeList: 0,
            activeItem: 0,
        })
    }

    render() {
        return (
            <div className={"examples"}>
                <h1>SideBar</h1>
                <h2>Overview</h2>
                <p>The SideBar</p>
                <h2>Example</h2>
                <div style={{height: "800px", width: '700px', "backgroundColor":'#700000'}}>
                    <SideBar
                        header={'dd'}
                        icons={['a', 'b']}
                        options={
                            [
                                {
                                    header: 'Hello',
                                    items: ['One', 'Two', 'Three']
                                },
                            ]
                        }
                        footer={(<List header={"Account"} items={['Settings', 'Logout']} />)}

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
                </div>
            </div>
        );
    }
}

export default SideBarExample;