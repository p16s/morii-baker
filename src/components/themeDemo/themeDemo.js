import React from "react";
import './themeDemo.css';

import Button from "../atoms/button/button";
import Input from "../molecules/input/input";
import Textarea from "../molecules/textarea/textarea";
import Pin from "../molecules/pin/pin";



class ThemeDemo extends React.Component {
    render() {
        return (
            <div className={"theme-demo"}>
                <section>
                    <h1 className={"section-heading"}>Main branding</h1>

                    <div className={"branding"}>
                        <div className={"branding-color-col"}>
                            <div className={"brand-color one-darker"}>Darker</div>
                            <div className={"brand-color one"}>100%</div>
                            <div className={"brand-color one-b"}>80%</div>
                            <div className={"brand-color one-c"}>50%</div>
                            <div className={"brand-color one-d"}>30%</div>
                            <div className={"brand-color one-e"}>10%</div>
                        </div>

                        <div className={"branding-color-col"}>
                            <div className={"brand-color two-darker"}>Darker</div>
                            <div className={"brand-color two"}>100%</div>
                            <div className={"brand-color two-b"}>80%</div>
                            <div className={"brand-color two-c"}>50%</div>
                            <div className={"brand-color two-d"}>30%</div>
                            <div className={"brand-color two-e"}>10%</div>
                        </div>

                        <div className={"branding-color-col"}>
                            <div className={"brand-color three-darker"}>Darker</div>
                            <div className={"brand-color three"}>100%</div>
                            <div className={"brand-color three-b"}>80%</div>
                            <div className={"brand-color three-c"}>50%</div>
                            <div className={"brand-color three-d"}>30%</div>
                            <div className={"brand-color three-e"}>10%</div>
                        </div>
                    </div>
                </section>


                <section>
                    <h1 className={"section-heading"}>Typography</h1>

                    <h1>This is a title H1</h1>
                    <h2>This is a title H2</h2>
                    <h3>This is a title H3</h3>
                    <h4>This is a title H4</h4>

                    <p>This is a paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien eget quis at purus, mus dis faucibus mauris. At tincidunt sem tempor, ultrices nisi commodo, scelerisque viverra.</p>

                    <p>
                        <strong>This is a paragraph bold - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien eget quis at purus, mus dis faucibus mauris. At tincidunt sem tempor, ultrices nisi commodo, scelerisque viverra.</strong>
                    </p>

                    <p>
                        <small>This is a small text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien eget quis at purus, mus dis faucibus mauris. At tincidunt sem tempor, ultrices nisi commodo, scelerisque viverra.</small>
                    </p>
                </section>


                <section>
                    <h1 className={"section-heading"}>Buttons</h1>

                    <div className={"buttons"}>
                        <Button>Standard Button</Button>
                        <Button className={"outline"}>Standard outline Button</Button>
                        <Button disabled={true}>Standard disabled Button</Button>
                    </div>

                    <div className={"buttons"}>
                        <Button className={"secondary"}>Secondary Button</Button>
                        <Button className={"secondary outline"}>Secondary Outline Button</Button>
                        <Button className={"secondary"} disabled={true}>Standard disabled Button</Button>
                    </div>
                </section>

                <section>
                    <h1 className={"section-heading"}>Form elements</h1>

                    <form>
                            <img src="https://www.countryflags.io/gb/flat/24.png" />
                        <Input
                            for={"basic"}
                            labelText={"Label"}

                            id={"basic"}
                            value={"Value passed"}
                            placeholder={"Placeholder"}
                        />

                        <Textarea
                            for={"basic"}
                            labelText={"Label"}

                            id={"basic"}
                            placeholder={"Placeholder"}
                        />

                        <Pin labelText={"Label"} />
                    </form>
                </section>
            </div>
        );
    }
}


export default ThemeDemo;