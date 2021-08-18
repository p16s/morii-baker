import BakerExample from "../../../../helpers/bakerExample";
import Toast from "../toast";


class ToastExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Toast</h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "Toast",
            <Toast>
            </Toast>,
            "Controls the display of Alert"
        );
    }
}


export default ToastExample;