 import BakerExample from "../../../../helpers/bakerExample";
import SenderTags from "../senderTags";


class SenderTagsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Sender tags</h1>

                {this.render_normal()}
            </section>
        );
    }


    /**
     * render_normal (example)
     * @returns {JSX.Element}
     */
    render_normal() {
        const availableTags = [
            {
                "name": "a_available_tag1"
            },
            {
                "name": "a_available_tag2"
            },
            {
                "name": "b_available_tag1"
            },
            {
                "name": "c_available_tag1"
            }
        ]


        return this.render_exampleComponent(
            "senderTags/Normal",
            <SenderTags
                availableTags={availableTags}
                onTagsUpdate={(e) => {
                    console.log("senderTags onTagsUpdate", e, " (api post/array sort etc)");
                }}
            />,
            "User types, gets available tags, adds"
        );
    }

}


export default SenderTagsExample;