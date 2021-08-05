import BasicAtom from "../../atoms/basicAtom";
import './default.css';
import List from "../../molecules/list/list";
import SideBar from "../../organisms/sideBar/sideBar";


class Default extends BasicAtom {
    render(className, props) {
        return (
            <main className="Default-template">
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
            </main>
        );
    }
}


export default Default;