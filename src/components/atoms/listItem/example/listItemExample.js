import BakerExample from "../../../../helpers/bakerExample";
import ListItem from "../listItem";


class ListItemExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Lists

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=41%3A3350"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_basic()}
                {this.render_active()}
                {this.render_disabled()}
                {/*{this.render_group()}*/}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'List / Normal / Normal',
            <ul style={{"backgroundColor":'#424E79'}}>
                <ListItem
                    onClick={()=>{
                        alert('List clicked!');
                    }}
                >
                    Item
                </ListItem>
            </ul>,
            'Default single list.  With click event.'
        );
    }


    render_active() {
        return this.render_exampleComponent(
            'List / Normal / Active',
            <ul style={{"backgroundColor":'#424E79'}}>
                <ListItem
                    active={true}
                    onClick={()=>{
                        alert('List clicked!');
                    }}
                >
                    Item
                </ListItem>
            </ul>,
            'Active single list.  With click event.'
        );
    }


    render_disabled() {
        return this.render_exampleComponent(
            'List / Disabled',
            <ul style={{"backgroundColor":'#424E79'}}>
                <ListItem isClickable={false}>
                    Item
                </ListItem>
            </ul>,
            'Disabled single list.'
        );
    }


    render_group() {
        return this.render_exampleComponent(
            'Lists / Example',
            <ul
                style={{
                    "backgroundColor":'#424E79',
                    display: 'flex',
                    'flexDirection': 'column',
                    width: '50%',
                }}
            >
                <ListItem onClick={()=>{alert('List clicked!');}}>Item</ListItem>
                <ListItem onClick={()=>{alert('List clicked!');}}>Item</ListItem>
                <ListItem onClick={()=>{alert('List clicked!');}}>Item</ListItem>
                <ListItem onClick={()=>{alert('List clicked!');}}>Item</ListItem>
                <ListItem onClick={()=>{alert('List clicked!');}}>Item</ListItem>
            </ul>,
            'Quick example of a group of lists (Note: this will move to molecules when done)'
        );
    }

}

export default ListItemExample;