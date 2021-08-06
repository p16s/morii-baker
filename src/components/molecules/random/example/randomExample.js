import BakerExample from "../../../../helpers/bakerExample";
import Random from "../random";

class RandomExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Silly Elements - Random
                </h1>

                {this.render_normal()}
            </section>
        );
    }
    render_normal() {
        return this.render_exampleComponent(
            "Pin/Normal",
            <Random
                list={["Mike", "Dave","Jose","Rob","Eowyn", "Dom", "Raffi", "Henry"]}
            />,
            "Label and Pin atoms used together."
        );
    }
}

export default RandomExample;