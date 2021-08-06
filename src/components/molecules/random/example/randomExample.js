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
            "Random/Normal",
            <Random
                list={["Mike", "Dave","Jose","Rob","Eowyn", "Dom", "Raffi", "Henry"]}
            />,
            "Just a randomizer"
        );
    }
}

export default RandomExample;