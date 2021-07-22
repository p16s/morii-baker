import React from 'react';
import './bakerExample.css';


class BakerExample extends React.Component {
    /**
     * Default render returns nothing (should be overwrote by child class)
     * @returns {string}
     */
    render() {
        return ('');
    }

    /**
     * Render the example component
     * @param title
     * @param what
     * @param about
     * @returns {JSX.Element}
     */
    render_exampleComponent(title, what, about) {
        return (
            <section className={"BakerExample"}>
                <h2 className={'baker-example-title'}>{title}</h2>
                <p className={"baker-example-about"}>{about}</p>

                <div className={"component-wrapper"}>
                    {what}
                </div>
            </section>
        )
    }
}


export default BakerExample;