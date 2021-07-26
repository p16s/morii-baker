import React from 'react';
import IconBar from "../iconBar";
import Icon from "../../../atoms/icon/icon";

class IconBarExample extends React.Component {
    render() {
        return (
            <div className={"examples"}>
                <h1>IconBar</h1>
                <h2>Overview</h2>
                <p>The IconBar is designed to hold icons</p>
                <h2>Example</h2>
                <div style={{height: "500px", width: '300px', "backgroundColor":'#700000'}}>
                    <IconBar activeIcon={1} icons={["1","2","3"]} onClick={(e, key) => {alert('Clicked ' + key);}}>
                        <Icon letter={"A"} active={true}/>
                        <Icon letter={"B"}/>
                        <Icon letter={"C"}/>
                        <Icon letter={"P"} active={true}/>
                    </IconBar>
                </div>

            </div>
        );
    }
}
export default IconBarExample;