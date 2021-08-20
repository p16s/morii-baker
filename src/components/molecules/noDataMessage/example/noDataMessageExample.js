import BakerExample from "../../../../helpers/bakerExample";
import NoDataMessage from "../noDataMessage";


class NoDataMessageExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>No Data (message)</h1>

                {this.render_basic()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Standard',
            <NoDataMessage>
                <p>Content is child prop</p>
            </NoDataMessage>,
             'Basic example'
        );
    }
}


export default NoDataMessageExample;