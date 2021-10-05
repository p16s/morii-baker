import BakerExample from "../../../../helpers/bakerExample";
import Filters from "../filters";


class FiltersExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Filters
                </h1>

                {this.render_normal()}
            </section>
        );
    }

    render_normal() {
        const fakeOptions = [
            {
                "list_title": "List 1",
                "children": [
                    "list1_opt1",
                    "list1_opt2",
                    "list1_opt3"
                ]
            },
            {
                "list_title": "List 2",
                "children": [
                    <>
                        <input
                            id="opt1_1"
                            type="radio"
                            name="op1"
                        />
                        <label htmlFor="opt1_1">list2_opt1</label>
                    </>,
                    <>
                        <input
                            id="opt1_2"
                            type="radio"
                            name="op1"
                        />
                        <label htmlFor="opt1_2">list2_opt2</label>
                    </>,
                    <>
                        <input
                            id="opt1_3"
                            type="radio"
                            name="op1"
                        />
                        <label htmlFor="opt1_3">list2_opt3</label>
                    </>,
                ]
            },
            {
                "list_title": "List 3",
                "children": [
                    <input type="text" />
                ]
            },


        ]

        return (
            <Filters
                className={"dsaasdasdasdksadasdasd"}
                options={fakeOptions}
                isSelected={1}
                onChange={(e) => {
                    console.log("handle change of option", e);
                }}
            />
        );
    }

}


export default FiltersExample;