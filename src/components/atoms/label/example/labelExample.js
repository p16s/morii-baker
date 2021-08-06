import BakerExample from "../../../../helpers/bakerExample";
import Label from "../label";
import formInput from "../../formInput/formInput";


class LabelExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Labels</h1>

                {this.render_normal()}
            </section>
        );
    }


    /**
     * Render the basic label titleBar.js
     * @returns {JSX.Element}
     */
    render_normal() {
        return this.render_exampleComponent(
            'Label / Normal',
            <Label for={"for-titleBar.js"}>Example of label text</Label>,
            "This is a test label. It takes the for property"
        );
    }
}


export default LabelExample;