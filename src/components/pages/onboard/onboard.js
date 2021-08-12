import BasicAtom from "../../atoms/basicAtom";
import TemplateMinimal from "../../templates/minimal/minimal";
import "./onboard.css";
import Input from "../../molecules/input/input";
import InputPhone from "../../molecules/inputPhone/inputPhone";
import Button from "../../atoms/button/button";


class PageOnboard extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
        });
    }


    render(className, props) {
        return (
            <TemplateMinimal className="page-onboard">
                <h1>Welcome to Purposeful</h1>
                <p>Please fill the following details</p>

                <form>
                    <section>
                        <Input
                            for={"full-name"}
                            labelText={"Full Name"}

                            id={"full-name"}
                            value={null}
                            placeholder={"e.g. John Smith"}
                        />
                    </section>

                    <section>
                        <InputPhone
                            for={"phone"}
                            labelText={"Phone number"}

                            id={"phone"}
                            value={"+44"}
                            placeholder={"Enter phone number"}
                        />
                    </section>

                    <section>
                        [notification prefs]
                    </section>

                    <section>
                        [pin]
                    </section>

                    <Button>Save details</Button>
                </form>
            </TemplateMinimal>
        );
    }
}


export default PageOnboard;