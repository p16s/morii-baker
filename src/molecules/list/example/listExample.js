import React from "react";
import List from "../list";
import ListItem from "../../../atoms/listItem/listItem";

class ListExample extends React.Component {
    render() {
        return (
            <div className={"examples"}>
                <h1>List</h1>
                <h2>Overview</h2>
                <p>The List</p>
                <h2>Example</h2>
                <div style={{height: "300px", width: '200px', "backgroundColor":'#700000'}}>
                    <List
                        header={'List'}
                        items={['One', 'Two']}
                        activeItem={0}
                    >
                        <ListItem>Three</ListItem>
                    </List>
                    <List
                        header={'List two'}
                        items={['One', 'Two']}
                    >
                        <ListItem active={true}>Three</ListItem>
                    </List>
                </div>

            </div>
        );
    }
}

export default ListExample;