import BakerExample from "../../../../helpers/bakerExample";
import Filters from "../filters";
import FormInput from "../../../atoms/formInput/formInput";
import InputTags from "../../inputTags/inputTags";


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


    /**
     * render_normal (example)
     * @returns {JSX.Element}
     */
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
                    // <FormInput
                    //     onChange={(e) => {
                    //         console.log("FormInput on change ", e);
                    //     }}
                    //     onEnter={() => {
                    //         console.log("FormInput onEnter");
                    //     }}
                    // />,
                    <InputTags />,
                ]
            },
        ]


        return this.render_exampleComponent(
            "TagsSelect/Normal",
            <Filters
                className={"example-class"}
                options={fakeOptions}
                onChildClick={(e, index) => {
                    console.log("TagsSelect onChildClick", e, index);
                }}
            />,
            "Each filter list can be any component passed in via the array.  This component just handles the list presentation/logic"
        );
    }

}


export default FiltersExample;