import BakerExample from "../../../../helpers/bakerExample";
import Pin from "../pin";


class PinExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Form Elements - Pin

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=10%3A306"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Components*/}
                    {/*</a>*/}
                </h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "Pin/Normal",
            <form>
                <Pin
                    labelText={"Label"}
                />
            </form>,
            "Label and Pin atoms used together."
        );
    }
}


export default PinExample;