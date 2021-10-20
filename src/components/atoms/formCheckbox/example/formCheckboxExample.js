import BakerExample from "../../../../helpers/bakerExample";
import FormCheckbox from "../formCheckbox";


class FormCheckboxExample extends BakerExample {
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
            'FormCheckbox / Normal / Normal',
            <form>
                <FormCheckbox
                    onClick={() => {console.log('clicked FormCheckbox');}}
                />
            </form>,
            'Test formCheckbox.  With click event.'
        );
    }


    render_basic_checked() {
        return this.render_exampleComponent(
            'FormCheckbox / Normal / Checked',
            <form>
                <FormCheckbox
                    selected={true}
                    onClick={(e) => {
                        console.log('clicked FormCheckbox')
                    }}
                />
            </form>,
            'Test formCheckbox.  With click event.'
        );
    }


    render_large() {
        return this.render_exampleComponent(
            'FormCheckbox / Big / Normal',
            <form>
                <FormCheckbox
                    className={'large'}
                    onClick={() => {
                        console.log('clicked FormCheckbox');
                    }}
                />
            </form>,
            'Test formCheckbox.  With click event.'
        );
    }


    render_large_checked() {
        return this.render_exampleComponent(
            'FormCheckbox / Big / Checked',
            <form>
                <FormCheckbox
                    selected={true}
                    className={'large'}
                    onClick={() => {
                        console.log('clicked FormCheckbox');
                    }}
                />
            </form>,
            'Test formCheckbox.  With click event.'
        );
    }
}


export default FormCheckboxExample;