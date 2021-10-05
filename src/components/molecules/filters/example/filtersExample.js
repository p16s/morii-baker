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
                "value": "option 1"
            },
            {
                "value": "option 2"
            },
            {
                "value": "option 3"
            }
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