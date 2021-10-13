import BakerExample from "../../../../helpers/bakerExample";
import InputTags from "../inputTags";


class InputTagsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Input Tags</h1>

                {this.render_normal()}
            </section>
        );
    }


    /**
     * render_normal (example)
     * @returns {JSX.Element}
     */
    render_normal() {
        const fakeTags = [
            {
                "name": "tag1",
                "date_added": "?"
            },
            {
                "name": "tag2",
                "date_added": "?"
            },
            {
                "name": "tag3",
                "date_added": "?"
            }
        ]


        return this.render_exampleComponent(
            "InputTags/Normal",
            <InputTags
                className={"example-class"}
                existingTags={fakeTags}
                onTagsUpdate={(e) => {
                    console.log("SenderTags onTagsUpdate", e, " (api post etc)");
                }}
            />,
            "Used in combination with FilterTags to create an array of tags (shown with some already added)"
        );
    }

}


export default InputTagsExample;