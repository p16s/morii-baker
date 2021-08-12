import BakerExample from "../../../../helpers/bakerExample";
import ContactPreferences from "../contactPreferences";


class ContactPreferencesExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>Contact Preferences</h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "Contact preferences",
            <ContactPreferences />,
            "Group of toggles for contact prefs"
        );
    }
}


export default ContactPreferencesExample;