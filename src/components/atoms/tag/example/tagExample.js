import BakerExample from "../../../../helpers/bakerExample";
import Tag from "../tag";


class TagExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Tags

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=32%3A0"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}
                {this.render_style_examples()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <Tag>Tag name</Tag>,
            'Basic tag'
        );
    }


    render_style_examples() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <>
                <Tag className="success">Success</Tag>
                <Tag className="error">Error</Tag>
                <Tag className="sent">Sent</Tag>
                <Tag className="pending">Pending</Tag>
            </>,
            'Basic tag with style modifiers'
        );
    }
}


export default TagExample;