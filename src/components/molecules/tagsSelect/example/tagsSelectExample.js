import BakerExample from "../../../../helpers/bakerExample";
import TagsSelect from "../tagsSelect";


class TagsSelectExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Tags Select</h1>

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
            },
            {
                "name": "tag4",
                "date_added": "?"
            }
        ]


        return this.render_exampleComponent(
            "TagsSelect/Normal",
            <TagsSelect
                availableTags={fakeTags}
                onTagsUpdate={(e) => {
                    console.log("TagsSelect onTagsUpdate", e, " (api post/array sort etc)");
                }}
            />,
            "Select (add) tags to a collection when clicked"
        );
    }

}


export default TagsSelectExample;