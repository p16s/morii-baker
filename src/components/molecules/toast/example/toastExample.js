import BakerExample from "../../../../helpers/bakerExample";
import Toast from "../toast";
import Button from "../../../atoms/button/button";


class ToastExample extends BakerExample {
    state = {
        showAlert: true
    }

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
            <>
                <Button
                    onClick={() => {
                        this.setState({
                            showAlert: true
                        });
                    }}
                >
                    Click to show again
                </Button>

                <Toast
                    isVisible={this.state.showAlert}
                    stoppedShowing={(e) => {
                        this.setState({
                            showAlert: false
                        });
                    }}
                >
                    Alert Message
                </Toast>
            </>,
            "Controls the display of Alert (is fixed position)"
        );
    }
}


export default ToastExample;