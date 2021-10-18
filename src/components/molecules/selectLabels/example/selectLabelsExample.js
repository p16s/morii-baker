import BakerExample from "../../../../helpers/bakerExample";
import SelectLabels from "../selectLabels";


class SelectLabelsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Select labels</h1>

                {this.render_normal()}
            </section>
        );
    }


    /**
     * render_normal (example)
     * @returns {JSX.Element}
     */
    render_normal() {
        const fakeLabels = [
            {
                "name": "label1"
            },
            {
                "name": "label2"
            },
            {
                "name": "label3"
            },
            {
                "name": "label4"
            }
        ]


        return this.render_exampleComponent(
            "SelectLabels/Normal",
            <SelectLabels
                availableLabels={fakeLabels}
                onLabelsUpdate={(e) => {
                    console.log("SelectLabels onTagsUpdate", e, " (api post/array sort etc)");
                }}
            />,
            "Select (add) labels to a collection when clicked"
        );
    }

}


export default SelectLabelsExample;