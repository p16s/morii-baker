import BakerExample from "../../../../helpers/bakerExample";
import Table from "../table";
import Tag from "../../../atoms/tag/tag";


class TableExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    [Table]

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=29%3A834"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "Table/Normal",
            <Table
                className={"example"}
                thead={[
                    "Name",
                    "Sent",
                    "Open rate",
                    "Status",
                ]}
                tbody={[
                    [
                        <strong>Test message</strong>,
                        '7/14/2021, 11:10:04 AM',
                        '100%',
                        <Tag className="sent">Sent</Tag>
                    ],
                    [
                        <strong>Second message</strong>,
                        '7/14/2021, 11:10:04 AM',
                        '100%',
                        <Tag className="draft">Draft</Tag>
                    ],
                    [
                        <strong>David von Dadelszen</strong>,
                        '7/14/2021, 11:10:04 AM',
                        '100%',
                        <Tag className="pending">Pending</Tag>
                    ]
                ]}
            />,
            "Table example"
        );
    }
}


export default TableExample;