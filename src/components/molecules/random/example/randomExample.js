import BakerExample from "../../../../helpers/bakerExample";
import Random from "../random";
import IconClose from "../../../atoms/icons/close";


class RandomExample extends BakerExample {
    constructor(props) {
        super(props);

        this.state = {
            availableUsers: ["Mike", "Dave","Jose","Rob","Eowyn", "Dom", "Raffi", "Henry"],
            toShuffel: ["Mike", "Dave","Jose","Rob","Eowyn", "Dom", "Raffi", "Henry"],
        }
    }


    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Silly Elements - Random
                </h1>

                {this.render_normal()}
                {this.render_modify()}
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


    render_modify() {
        return this.render_exampleComponent(
            "Random/Modifiable",

            <div style={{'display': 'flex'}}>
                <div style={{'width': '50%'}}>
                    <p>
                        <strong>The order is:</strong>
                    </p>

                    <Random
                        list={this.state.toShuffel}
                    />
                </div>

                <div style={{'width': '50%'}}>
                    <p>
                        <strong>Click to remove users:</strong>
                    </p>

                    {this.render_available_list()}
                </div>
            </div>,
            "Randomizer with ability to remove an absent user"

        );
    }


    render_available_list() {
        return (this.state.toShuffel ?? []).map((user, index) => {
            return (
                <p
                    style={{'cursor': 'pointer'}}
                    onClick={(e) => {
                        let newList = [...this.state.toShuffel];
                        newList.splice(index, 1);

                        this.setState({
                            toShuffel: newList
                        });
                    }}
                    key={'auser-' + index}
                >
                    {user}
                </p>
            );
        });
    }
}


export default RandomExample;