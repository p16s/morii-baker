import BakerExample from "../../../../helpers/bakerExample";
import NonMembers from "../nonMembers";


class NonMembersExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Non-Members content

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
            "Non-Members",
            <div
                style={{
                    "backgroundColor": "rgba(255, 0, 0, .25)",
                    "minHeight": "500px",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <NonMembers />
            </div>,
            ""
        );
    }
}


export default NonMembersExample;