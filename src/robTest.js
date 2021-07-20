import React from "react";


class RobTest extends React.Component {
    render() {
        return (
            <section>
                <h1>Rob Test</h1>

                <p>
                    Counter: {this.state.count}

                    <button onClick={() => this.updateCount()}>Update</button>
                </p>

                <hr />

                <p>
                    <input
                        value={this.state.first_name}
                        onChange={(e) => this.setFirstName(e.target.value)}
                    />
                    <input
                        value={this.state.last_name}
                        onChange={(e) => this.setLastName(e.target.value)}
                    />
                </p>
            </section>
        );
    }




    //  STATE
    constructor() {
        super();

        this.state = {
            count: 1,
            formText: "Default form text",
            first_name: 'default first',
            last_name: 'default last'
        }
    }


    // METHODS
    setFirstName(e) {
        this.setState({
            first_name: this.state.first_name = e
        });
    }

    setLastName(e) {
        this.setState({
            last_name: this.state.last_name = e
        });
    }

    updateCount() {
        this.setState({
            count: this.state.count + 1
        });
    }
}


export default RobTest;