import BakerExample from "../../../../helpers/bakerExample";
import List from "../list";


class ListExample extends BakerExample {
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
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'List / Normal / Normal',
            <div style={{"backgroundColor":'#424E79'}}>
                <List
                    header={'List header'}
                    items={
                        [
                            'List item titleBar.js',
                            'List item titleBar.js',
                            'List item titleBar.js',
                            'List item titleBar.js',
                            'List item titleBar.js',
                        ]
                    }
                    activeItem={0}
                    onClick={()=>{
                        alert('List clicked!');
                    }}
                />
            </div>,
            'Default single list with listHeader.  With click event.'
        );
    }
}


export default ListExample;
