import BakerExample from "../../../../helpers/bakerExample";
import InputLabels from "../inputLabels";


class InputLabelsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Input Labels</h1>

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
            }
        ]


        return this.render_exampleComponent(
            "InputLabels/Normal",
            <InputLabels
                className={"example-class"}
                existingTags={fakeLabels}
                onTagsUpdate={(e) => {
                    console.log("SenderTags onTagsUpdate", e, " (api post etc)");
                }}
            />,
            "Used to create an array of labels"
        );
    }

}


export default InputLabelsExample;