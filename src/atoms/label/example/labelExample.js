import BakerExample from "../../../helpers/bakerExample";
import Label from "../label";


class LabelExample extends BakerExample {
    render() {
        return this.render_exampleComponent(
            'Normal',
            <Label for={"for-example"}>Hello World.</Label>,
            "This is a default label. It takes the for property"
        )
    }
}


export default LabelExample;