import BakerExample from "../../../../helpers/bakerExample";
import IconSearch from "../search";
import IconAdd from "../add";
import IconTick from "../tick";
import IconError from "../error";
import IconInfo from "../info";
import IconMinus from "../minus";
import IconClose from "../close";
import IconFile from "../file";


class IconsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Icon

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=223%3A1112"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_examples()}
            </section>
        );
    }


    render_examples() {
        return this.render_exampleComponent(
            "Icons as atoms",
            <>
                <IconAdd />
                <IconClose />
                <IconError />
                <IconFile />
                <IconInfo />
                <IconMinus />
                <IconSearch />
                <IconTick />
            </>,
            "Icons added as simple atoms so we can globally and individually update their style."
        );
    }
}


export default IconsExample;