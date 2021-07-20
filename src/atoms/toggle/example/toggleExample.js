import Toggle from "../toggle";
import BakerExample from "../../../helpers/bakerExample";


class ToggleExample extends BakerExample {
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
                value={this.state.isOn}
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
                value={this.state.isOn}
                onChange={() => {
                    this.handleToggleChange()
                }}
                label={(this.state.isOn ? "On" : "Off")}
            />,
            'Toggle with label'
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // States
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Is it on or off?
     *
     * @returns {boolean}
     */
    constructor(props) {
        super(props);

        this.state = {
            isOn: true
        }
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
            isOn: this.isOn = !this.isOn
        })
    }


}


export default ToggleExample;