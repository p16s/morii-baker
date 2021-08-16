import BakerExample from "../../../../helpers/bakerExample";
import Tab from "../../../atoms/tab/tab";



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
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent (
            'Tabbar',
            <TitleBar>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
            </TitleBar>,
            'Collection of tabs'
        );
    }
}


export default TabBarExample;