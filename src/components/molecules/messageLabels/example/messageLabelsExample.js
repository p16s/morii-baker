 import BakerExample from "../../../../helpers/bakerExample";
import MessageLabels from "../messageLabels";


class MessageLabelsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Message labels</h1>

                {this.render_normal()}
            </section>
        );
    }


    /**
     * render_normal (example)
     * @returns {JSX.Element}
     */
    render_normal() {
        const availableLabels = [
            {
                "name": "a_available_label1"
            },
            {
                "name": "a_available_label2"
            },
            {
                "name": "b_available_label1"
            },
            {
                "name": "c_available_label1"
            }
        ]


        return this.render_exampleComponent(
            "MessageLabels/Normal",
            <MessageLabels
                availableLabels={availableLabels}
                onLabelsUpdate={(e) => {
                    console.log("MessageLabels onLabelsUpdate", e, " (api post/array sort etc)");
                }}
            />,
            "User types, gets available labels, adds"
        );
    }

}


export default MessageLabelsExample;