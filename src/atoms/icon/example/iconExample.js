import Icon from "../icon";
import BakerExample from "../../../helpers/bakerExample";

class IconExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Icon</h1>
                <h2>Overview</h2>
                <p>The Icon supports the onClick property and has the following uses...</p>

                {this.render_basic()}
                {this.render_active()}
                {this.render_backgroundColour()}
                {this.render_activeColour()}
                {this.render_letter()}
                {this.render_image()}
            </section>
        );
    }

    render_image() {
        return this.render_exampleComponent(
            "Render Image",
            <Icon src={'https://app.morii.io/favicon.png'} alt={""} />,
            "Use the 'src' property and 'alt'"
        );
    }

    render_letter() {
        return this.render_exampleComponent(
            "Render letter",
            <Icon letter={'P'} />,
            "Use the 'letter' property"
        );
    }

    render_backgroundColour() {
        return this.render_exampleComponent(
            "Change Background Colour",
            <div style={{'--Icon-background-color' : '#ff0000'}}>
                <Icon active={true} />
            </div>,
            "Use the '--Icon-background-color' css var to change background colour"
        );
    }


    render_activeColour() {
        return this.render_exampleComponent(
            "Change Active Colour",
            <div style={{'--Icon-active-color' : '#ff0000'}}>
                <Icon active={true} />
            </div>,
            "Use the '--Icon-active-color' css var to change background colour"
        );
    }

    render_active() {
        return this.render_exampleComponent(
            "Active",
            <Icon active={true}/>,
            "Set the 'active' property to true"
        );
    }

    render_basic() {
        return this.render_exampleComponent(
            "Basic",
            <Icon />
        );
    }
}

export default IconExample;