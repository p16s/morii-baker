import BasicAtom from "../../atoms/basicAtom";
import './test.css';
import Tag from "../../atoms/tag/tag";
import Table from "../../molecules/table/table";
import TemplateDefault from "../../templates/default/default";


class PageTest extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
        });
    }


    render(className, props) {
        return (
            <TemplateDefault>
                <main>
                    <h1>Main "Page" content here</h1>

                    <h2>Example content here, this would be passed in via the page </h2>

                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt doloribus expedita molestiae sunt voluptates! Consequatur corporis dolorem doloremque explicabo id iure modi quae reiciendis rerum saepe totam, vero. Aut, nisi.</p>

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
                    />
                </main>
            </TemplateDefault>
        );
    }
}


export default PageTest;