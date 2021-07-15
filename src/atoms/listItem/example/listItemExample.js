import React from "react";
import ListItem from "../listItem";

class ListItemExample extends React.Component {
    render() {
        return (
            <section className={"examples"}>
                <h1>ListItem</h1>
                <h2>Overview</h2>
                <p>The ListItem has active and onclick. The active prop is set to true on 1 and 3. The property onClick is on 4.</p>
                <h2>Example</h2>
                <div style={{height: "300px", width: '200px', "backgroundColor":'#700000'}}>
                    <ListItem active={true}>Item</ListItem>
                    <ListItem>Item 2</ListItem>
                    <ListItem active={true}>Item 3</ListItem>
                    <ListItem onClick={()=>{alert('Clicked!');}}>Item 4</ListItem>
                </div>

            </section>
        );
    }
}

export default ListItemExample;