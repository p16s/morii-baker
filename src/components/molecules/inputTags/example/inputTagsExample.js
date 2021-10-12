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
            "TagsSelect/Normal",
            <InputTags
                className={"example-class"}
                existingTags={fakeTags}
                onTagsUpdate={(e) => {
                    console.log("TagsSelect onTagsUpdate", e, " (api post etc)");
                }}
            />,
            "Input and TagFilterExample components used in combination to create an array of tags"
        );
    }

}


export default InputTagsExample;