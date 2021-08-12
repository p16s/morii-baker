import Toggle from "../toggle";
import BakerExample from "../../../../helpers/bakerExample";


class ToggleExample extends BakerExample {
    constructor(props) {
        super(props);

        this.state = {
            firstIsOn: true,
            secondIsOn: false,
        }
    }


    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Toggles

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=32%3A0"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_basic()}
                {this.render_label()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Primary / Basic',
            <Toggle
                value={this.state.firstIsOn}
                onChange={() => {
                    this.handleToggleChange()
                }}
            />,
            'Basic toggle'
        );
    }


    render_label() {
        return this.render_exampleComponent(
            'Primary / With Label',
            <Toggle
                value={this.state.secondIsOn}
                onChange={() => {
                    this.handleSecondToggleChange()
                }}
                label={(this.state.secondIsOn ? "On" : "Off")}
            />,
            'Toggle with label'
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleToggleChange() {
        this.setState({
            firstIsOn: this.state.firstIsOn = !this.state.firstIsOn,
        });
    }

    handleSecondToggleChange() {
        this.setState({
            secondIsOn: this.state.secondIsOn = !this.state.secondIsOn,
        });
    }
}


export default ToggleExample;