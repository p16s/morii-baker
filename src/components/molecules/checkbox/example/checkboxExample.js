import BakerExample from "../../../../helpers/bakerExample";
import Checkbox from "../checkbox";


class CheckboxExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Form Elements - Checkbox</h1>

                {this.render_normal()}
                {this.render_disabled()}
            </section>
        );
    }


    /**
     * render_normal
     * @returns {JSX.Element}
     */
    render_normal() {
        return this.render_exampleComponent(
            "Checkbox/Normal",
            <form>
                <Checkbox
                    className="can-pass"

                    id={"basic"}
                    disabled={false}

                    for={"basic"}
                    labelText={"Label"}

                    onChange={() => {
                        console.log("CheckboxExample Checkbox onChange");
                    }}
                />
            </form>,
            "Label and Checkbox atoms used together."
        );
    }


    /**
     * render_disabled
     * @returns {JSX.Element}
     */
    render_disabled() {
        return this.render_exampleComponent(
            "Checkbox/Disabled",
            <form>
                <Checkbox
                    id={"basic-2"}
                    disabled={true}

                    for={"basic-2"}
                    labelText={"Another label"}

                    onChange={() => {
                        console.log("CheckboxExample Checkbox onChange");
                    }}
                />
            </form>,
            "Label and (disabled) Checkbox atoms used together."
        );
    }

}


export default CheckboxExample;