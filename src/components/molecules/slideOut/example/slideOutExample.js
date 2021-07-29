import BakerExample from "../../../../helpers/bakerExample";
import SlideOut from "../slideOut";


class SlideOutExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Slide out panel/drawer

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
            "Slid out/Normal",
            <div
                style={{
                    "backgroundColor": "rgba(255, 0, 0, .25)",
                    "minHeight": "300px",
                    overflow: "hidden",
                    position: "relative",

                }}
            >
                <SlideOut toggleName={"Handle name"}>
                    <h1>Children as props</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores, atque beatae dicta ea eaque enim et ex explicabo impedit ipsa iure laborum maxime nihil non, odio odit perspiciatis voluptate.</p>
                </SlideOut>
            </div>,
            "Hidden drawer that expands out on user interaction"
        );
    }
}


export default SlideOutExample;