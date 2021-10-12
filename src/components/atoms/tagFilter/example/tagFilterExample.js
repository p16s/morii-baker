import BakerExample from "../../../../helpers/bakerExample";
import TagFilter from "../tagFilter";
import IconClose from "../../icons/close";


class TagFilterExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Filter Tags</h1>

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
            <TagFilter>Tag name</TagFilter>,
            'Basic tag, used on filtering'
        );
    }


    /**
     * with remove
     * @returns {JSX.Element}
     */
    render_with_remove() {
        return this.render_exampleComponent(
            'With remove',
            <TagFilter
                onClick={() => {
                    console.log("TagFilter clicked: render_with_remove");
                }}
            >
                Tag name

                <IconClose />
            </TagFilter>,
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
            <TagFilter
                className="added"
                onClick={() => {
                    console.log("TagFilter clicked: render_added_example");
                }}
            >
                Tag name

                <IconClose />
            </TagFilter>,
            'Has been added to a "selected" filters array/list'
        );
    }
}


export default TagFilterExample;