import BakerExample from "../../../../helpers/bakerExample";
import SelectTags from "../selectTags";


class SelectTagsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Select tags</h1>

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
                "name": "tag1"
            },
            {
                "name": "tag2"
            },
            {
                "name": "tag3"
            },
            {
                "name": "tag4"
            }
        ]


        return this.render_exampleComponent(
            "SelectTags/Normal",
            <SelectTags
                availableTags={fakeTags}
                onTagsUpdate={(e) => {
                    console.log("SelectTags onTagsUpdate", e, " (api post/array sort etc)");
                }}
            />,
            "Select (add) tags to a collection when clicked"
        );
    }

}


export default SelectTagsExample;