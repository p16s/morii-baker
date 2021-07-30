import React from "react";
import DayJS from 'react-dayjs';


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


        const date = "2000-01-31T12:59-0500";
        
        return (
            <section>
                <h1>Rob Test</h1>


                <p>Date original: { date }</p>
                <p>Date formatted (DD-MM-YYYY): <DayJS format="DD-MM-YYYY">{ date }</DayJS></p>


                <hr />


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