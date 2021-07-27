import BakerExample from "../../../../helpers/bakerExample";
import IconBar from "../iconBar";
import Icon from "../../../atoms/icon/icon";
import Button from "../../../atoms/button/button";


class IconBarExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    [IconBar]

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=31%3A0"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Components*/}
                    {/*</a>*/}
                </h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "Iconbar/Normal",
            <div style={{"display": "flex", "minHeight": "800px"}}>
                <IconBar
                    icons={["1","2","3"]}
                    activeIcon={0}
                    onClick={(e, key) => { alert('Clicked ' + key); }}
                >
                    <Icon
                        src={'https://app.morii.io/favicon.png'}
                        alt={""}
                    />
                    <Icon
                        letter={"A"}
                        active={true}
                    />
                    <Icon letter={"B"}/>
                    <Icon letter={"C"}/>
                    <Icon
                        letter={"P"}
                        active={true}
                    />

                    {/*TODO some working out best method to align bottom and mobile, but want to work as organism first so parked*/}
                    <Button className={"secondary round"}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.2079 6.10571H5.95076V9.57714H4.03076V6.10571H0.790759V4.38286H4.03076V0.92H5.95076V4.38286H9.2079V6.10571Z" fill="white"/>
                        </svg>
                    </Button>
                </IconBar>
            </div>,
            "Iconbar, with use-case examples."
        )
    };
}


export default IconBarExample;