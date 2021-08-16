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
            </section>
        );
    }


    /**
     * basic render
     * @returns {JSX.Element}
     */
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
            'Test single list.  With click event.'
        );
    }


    /**
     * active
     * @returns {JSX.Element}
     */
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


    /**
     * disabled
     * @returns {JSX.Element}
     */
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
}

export default ListItemExample;