import React from "react";
import IconBar from "../../../molecules/iconBar/iconBar";
import Icon from "../../icon/icon";
import ListHeader from "../listHeader";

class ListHeaderExample extends React.Component {
    render() {
        return (
            <div className={"examples"}>
                <h1>ListHeader</h1>
                <h2>Overview</h2>
                <p>The ListHeader is a header for a list</p>
                <h2>Example</h2>
                <div style={{height: "100px", width: '200px', "backgroundColor":'#700000'}}>
                    <ListHeader>header</ListHeader>
                    <ListHeader>header 2</ListHeader>
                </div>

            </div>
        );
    }
}

export default ListHeaderExample;