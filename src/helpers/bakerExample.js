import React from 'react';


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
            <div className={"BakerExample"}>
                <h2>{title}</h2>
                {what}
                <p className={"about"}>{about}</p>
            </div>
        )
    }
}


export default BakerExample;