import Pin from '../pin';
import BakerExample from "../../../../helpers/bakerExample";


class PinExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Pin

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=41%3A3350"}*/}
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
            'Pin / Normal',
            <Pin />,
            'Default Pin.'
        );
    }
}


export default PinExample;