import BasicAtom from "../../atoms/basicAtom";
import IconBar from "../../molecules/iconBar/iconBar";
import List from "../../molecules/list/list";
import './login.css';
import FormInput from "../../atoms/formInput/formInput";
import Button from "../../atoms/button/button";
import FormPin from "../../atoms/formPin/formPin";
import Pin from "../../molecules/pin/pin";
import ValidationMessage from "../../atoms/validationMessage/validationMessage";


class Login extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            isStage: props.isStage,
            canGetUser: true,
            userEmail: "",
            userEmailError: false,
            userPin: ''
        });
    }


    render(className, props) {
        return (
            <div className={
                "Login"
                + this.getClassNameString()}
            >
                <div className="main-content">
                    {this.render_email()}

                    {this.render_identity()}
                </div>
            </div>
        );
    }


    render_email() {
        if (this.state.isStage === 1) {
            return (
                <>
                    <h1>Log in</h1>

                    <FormInput
                        type="email"
                        placeholder="Enter your email"
                        onChange={
                            (e) => this.setUserEmail(e)
                        }
                    />

                    {this.render_email_validation()}

                    <Button
                        disabled={!this.state.canGetUser}
                        onClick={
                            () => this.getUser()
                        }
                    >
                        Login
                    </Button>

                    <a
                        className="support-cta"
                        href="/"
                        title="Contact support"
                    >
                        Contact support
                    </a>
                </>
            );
        }
    }


    render_identity() {
        if (this.state.isStage === 2) {
            return (
                <>
                    <h1>Verify your identity</h1>

                    <p>Check your email for the verification code</p>

                    <Pin
                        labelText={"Your PIN number"}
                        onChange={
                            (e) => this.setUserPin(e)
                        }
                    />

                    <Button
                        disabled={this.state.userPin.length < 4}
                        onClick={
                            () => this.validateUser()
                        }
                    >
                        Enter
                    </Button>
                </>
            );
        }
    }


    render_email_validation() {
        if (this.state.userEmailError) {
            return (
                <ValidationMessage
                    className="error"
                    message={"[Dummy message]"}
                />
            );
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * getUser
     *
     * @param {MouseEvent} click
     */
    getUser() {
         alert("getUser clicked");

         this.setState({
             isStage: 2
         });
    }


    /**
     * setUserEmail
     *
     * @param {KeyboardEvent} e
     */
    setUserEmail(e) {
        console.log('setUserEmail', e);

        this.setState({
            userEmail: e
        });
    }


    /**
     * setUserPin
     *
     * @param {KeyboardEvent} e
     */
    setUserPin(e) {
        console.log('setUserPin', e);

        this.setState({
            userPin: e
        });
    }


    /**
     * validateUser
     *
     * @param {KeyboardEvent} e
     */
    validateUser() {
        alert("empty validateUser method");
    }
}


export default Login;