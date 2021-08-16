import BakerExample from "../../../../helpers/bakerExample";
import Tab from "../../../atoms/tab/tab";
import TabBar from "../tabBar";
import IconFile from "../../../atoms/icons/file";



class TabBarExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Tab bars

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=22%3A84"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Components*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}

                {this.render_with_icons()}
            </section>
        );
    }


    /**
     * basic example
     * @returns {JSX.Element}
     */
    render_basic() {
        return this.render_exampleComponent (
            'Tabbar',
            <TabBar>
                <Tab
                    className={"active"}
                    onClick={() => {
                        alert("tab 1 clicked");
                    }}
                >
                    Tab 1
                </Tab>

                <Tab
                    onClick={() => {
                        alert("tab 2 clicked");
                    }}
                >
                    Tab 2
                </Tab>
            </TabBar>,
            'Collection of tabs'
        );
    }



    render_with_icons() {
        return this.render_exampleComponent (
            'Tabbar',
            <TabBar>
                <Tab
                    className={"active"}
                    onClick={() => {
                        alert("tab 1 clicked");
                    }}
                >
                    <IconFile />
                    Tab 1
                </Tab>

                <Tab
                    onClick={() => {
                        alert("tab 2 clicked");
                    }}
                >
                    <IconFile />
                    Tab 2
                </Tab>
            </TabBar>,
            'With icons (shown on mobile)'
        );
    }
}


export default TabBarExample;