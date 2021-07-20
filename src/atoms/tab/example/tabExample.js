import BakerExample from "../../../helpers/bakerExample";
import Tab from "../tab";
import Toggle from "../../toggle/toggle";


class TabExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Tabs

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=32%3A0"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <Tab
                text={"Content"}
                onClick={() => {
                    alert('clicked Tab');
                }}
            />,
            'Basic tab'
        );
    }
}


export default TabExample;