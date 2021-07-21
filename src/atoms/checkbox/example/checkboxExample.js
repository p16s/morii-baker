import Checkbox from "../checkbox";
import BakerExample from "../../../helpers/bakerExample";


class CheckboxExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Checkbox

                    <a
                        href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=41%3A3350"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_basic()}
                {this.render_basic_checked()}
                {this.render_large()}
                {this.render_large_checked()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Checkbox / Normal / Normal',
            <form>
                <Checkbox
                    onClick={() => {console.log('clicked Checkbox');}}
                />
            </form>,
            'Default checkbox.  With click event.'
        );
    }


    render_basic_checked() {
        return this.render_exampleComponent(
            'Checkbox / Normal / Checked',
            <form>
                <Checkbox
                    selected={true}
                    onClick={(e) => {
                        console.log('clicked Checkbox')
                    }}
                />
            </form>,
            'Default checkbox.  With click event.'
        );
    }


    render_large() {
        return this.render_exampleComponent(
            'Checkbox / Big / Normal',
            <form>
                <Checkbox
                    className={'large'}
                    selected={false}
                    onClick={() => {console.log('clicked Checkbox');}}
                />
            </form>,
            'Default checkbox.  With click event.'
        );
    }


    render_large_checked() {
        return this.render_exampleComponent(
            'Checkbox / Big / Checked',
            <form>
                <Checkbox
                    selected={true}
                    className={'large'}
                    onClick={() => {
                        console.log('clicked Checkbox');
                    }}
                />
            </form>,
            'Default checkbox.  With click event.'
        );
    }
}


export default CheckboxExample;