import BakerExample from "../../../../helpers/bakerExample";
import Login from "../login";


class LoginExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    [Login]

                    {/*<a*/}
                    {/*    href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=216%3A909"}*/}
                    {/*    target={"_blank"}*/}
                    {/*>*/}
                    {/*    Documentation*/}
                    {/*</a>*/}
                </h1>

                {this.render_normal()}
            </section>
        );
    }


    render_normal() {
        return this.render_exampleComponent(
            "Login",
                <>
                    <Login />
                </>,
            ""
        );
    }
}


export default LoginExample;