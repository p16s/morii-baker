import React from "react";


class RobTest extends React.Component {
    render() {
        let isShowing = this.state.isShowing;

        const renderAuthButton = () => {
            if (isShowing) {
                return <h2>Is showing</h2>;
            } else {
                return <h2>Not showing</h2>;
            }
        }


        return (
            <section>
                <h1>Rob Test</h1>


                {renderAuthButton()}
                <button onClick={() => this.toggleVisibility()}>Toggle visibility</button>


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
            isShowing: true,
            count: 1,
            formText: "Default form text",
            first_name: 'default first',
            last_name: 'default last'
        }
    }


    // METHODS
    toggleVisibility() {
        this.setState({
            isShowing: this.state.isShowing = !this.state.isShowing
        });
    }

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