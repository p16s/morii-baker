import BakerExample from "../../../../helpers/bakerExample";
import Filters from "../filters";
import FormInput from "../../../atoms/formInput/formInput";
import InputTags from "../../inputTags/inputTags";
import SelectTags from "../../selectTags/selectTags";


class FiltersExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Filters
                </h1>

                {this.render_normal()}
                {this.render_default_open()}
            </section>
        );
    }


    /**
     * render_normal (example)
     * @returns {JSX.Element}
     */
    render_normal() {
        const fakeTags = [
            {
                "name": "label 1"
            },
            {
                "name": "label 2"
            },
            {
                "name": "label 3"
            },
            {
                "name": "label 4"
            },
            {
                "name": "label 5"
            },
            {
                "name": "label 6"
            }
        ]

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
                    <SelectTags
                        availableTags={fakeTags}
                        onTagsUpdate={(e) => {
                            console.log("Tags being selected from filtersExample", e, " (api post/array sort etc)");
                        }}
                    />,
                ]
            },
        ]


        return this.render_exampleComponent(
            "SelectTags/Normal",
            <Filters
                className={"example-class"}
                options={fakeOptions}
                onChildClick={(e, index) => {
                    console.log("SelectTags onChildClick", e, index);
                }}
            />,
            "Each filter list can be any component passed in via the array.  This component just handles the list presentation/logic"
        );
    }


    /**
     * render_default_open (example)
     * @returns {JSX.Element}
     */
    render_default_open() {
        const fakeTags = [
            {
                "name": "label 1"
            },
            {
                "name": "label 2"
            },
            {
                "name": "label 3"
            },
            {
                "name": "label 4"
            },
            {
                "name": "label 5"
            },
            {
                "name": "label 6"
            }
        ]

        const fakeOptions = [
            {
                "list_title": "Filter by label(s)",
                "children": [
                    <SelectTags
                        availableTags={fakeTags}
                        onTagsUpdate={(e) => {
                            console.log("Tags being selected from filtersExample", e, " (api post/array sort etc)");
                        }}
                    />
                ]
            },
        ]


        return this.render_exampleComponent(
            "SelectTags/Normal",
            <Filters
                preSelectedParent={0} 
                options={fakeOptions}
                ctaText={"Filter by label"}
                onChildClick={(e, index) => {
                    console.log("SelectTags onChildClick", e, index);
                }}
            />,
            "Shows a single child (via prop) with a pre-selected parent (with the main CTA text changed via prop)"
        );
    }
}


export default FiltersExample;