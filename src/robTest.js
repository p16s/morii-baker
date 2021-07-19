import React from "react";


class RobTest extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 1
        }
    }


    updateCount() {
        this.setState({
            count: this.state.count + 1

        });
    }

    render() {
        return (
            <section>
                <h1>Rob Test</h1>

                <p>
                    Counter: {this.state.count}

                    <button onClick={() => this.updateCount()}>Update</button>

                </p>
            </section>
        )
    }
}


export default RobTest;