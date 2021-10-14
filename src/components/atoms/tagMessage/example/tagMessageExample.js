import BakerExample from "../../../../helpers/bakerExample";
import TagMessage from "../tagMessage";
import IconClose from "../../icons/close";


class TagMessageExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Message Tags</h1>

                {this.render_basic()}
            </section>
        );
    }


    /**
     * basic example
     * @returns {JSX.Element}
     */
    render_basic() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <TagMessage
                onClick={(e) => {
                    console.log("TagMessage clicked ", e);
                }}
            >
                Message Tag name

                <IconClose />
            </TagMessage>,
            'Message tag, used on messages'
        );
    }
}


export default TagMessageExample;