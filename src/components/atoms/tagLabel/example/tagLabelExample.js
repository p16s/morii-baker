import BakerExample from "../../../../helpers/bakerExample";
import TagLabel from "../tagLabel";
import IconClose from "../../icons/close";


class TagLabelExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Label Tags</h1>

                {this.render_basic()}
                {this.render_with_remove()}
                {this.render_added_example()}
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
            <TagLabel>Tag name</TagLabel>,
            'Label tag, used as labels to sort and filter messages'
        );
    }


    /**
     * with remove
     * @returns {JSX.Element}
     */
    render_with_remove() {
        return this.render_exampleComponent(
            'With remove',
            <TagLabel
                onClick={() => {
                    console.log("TagLabel clicked: render_with_remove");
                }}
            >
                Tag name

                <IconClose />
            </TagLabel>,
            'Icon passed as child prop (no action on this example). Used when adding (creating) to a list'
        );
    }


    /**
     * show as added to a selected array
     * @returns {JSX.Element}
     */
    render_added_example() {
        return this.render_exampleComponent(
            'Added example',
            <TagLabel
                className="added"
                onClick={() => {
                    console.log("TagLabel clicked: render_added_example");
                }}
            >
                Tag name

                <IconClose />
            </TagLabel>,
            'Has been added to a "selected" filters array/list'
        );
    }
}


export default TagLabelExample;