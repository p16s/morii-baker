import BasicAtom from "../../atoms/basicAtom";
import './default.css';
import List from "../../molecules/list/list";
import SideBar from "../../organisms/sideBar/sideBar";
import TitleBar from "../../molecules/titleBar/titleBar";
import Breadcrumbs from "../../molecules/breadcrumbs/breadcrumbs";


class Default extends BasicAtom {
    render(className, props) {
        return (
            <div className="page Default-template">
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

                <main>
                    <Breadcrumbs
                        breadcrumbs={
                            [
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
                        }
                        logo={'https://app.morii.io/favicon.png'}
                    />


                    <TitleBar>
                        <h1>Heading as a h1</h1>
                    </TitleBar>
                </main>
            </div>
        );
    }
}


export default Default;