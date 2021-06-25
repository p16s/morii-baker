import React from 'react';
import Icon from "../icon";

class IconExample extends React.Component {
    render() {
        return (
            <div className={"examples"}>
                <h1>Icon</h1>
                <h2>Overview</h2>
                <p>The Icon supports the onClick property and has the following uses...</p>

                {this.render_basic()}
                {this.render_active()}
                {this.render_backgroundColour()}
                {this.render_activeColour()}
                {this.render_letter()}
                {this.render_image()}
            </div>
        );
    }

    render_image() {
        return this.render_icon(
            "Render Image",
            <Icon src={'https://app.morii.io/favicon.png'} alt={""} />,
            "Use the 'src' property and 'alt'"
        );
    }

    render_letter() {
        return this.render_icon(
            "Render letter",
            <Icon letter={'P'} />,
            "Use the 'letter' property"
        );
    }

    render_backgroundColour() {
        return this.render_icon(
            "Change Background Colour",
            <div style={{'--Icon-background-color' : '#ff0000'}}>
                <Icon active={true} />
            </div>,
            "Use the '--Icon-background-color' css var to change background colour"
        );
    }


    render_activeColour() {
        return this.render_icon(
            "Change Active Colour",
            <div style={{'--Icon-active-color' : '#ff0000'}}>
                <Icon active={true} />
            </div>,
            "Use the '--Icon-active-color' css var to change background colour"
        );
    }

    render_active() {
        return this.render_icon(
            "Active",
            <Icon active={true}/>,
            "Set the 'active' property to true"
        );
    }

    render_basic() {
        return this.render_icon(
            "Basic",
            <Icon />
        );
    }

    render_icon(title, what, about) {
        return (
            <div className={"example"}>
                <h2>{title}</h2>
                {what}
                <p className={"about"}>{about}</p>
            </div>
        )
    }
}

export default IconExample;