import BakerExample from "../../../helpers/bakerExample";
import List from "../list";


class ListExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    List

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=32%3A0"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <List
                text={"Content"}
                lists={[
                    {
                        "id": 0,
                        "title": "first link",
                        "slug": "/nowhere",
                        "open_new": true
                    },
                    {
                        "id": 1,
                        "title": "second link",
                        "slug": "/"
                    },
                    {
                        "id": 2,
                        "title": "third link",
                        "slug": "/"
                    }
                ]}
            />,
            'Basic list'
        );
    }
}


export default ListExample;