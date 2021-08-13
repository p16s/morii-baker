import BasicAtom from "../../atoms/basicAtom";
import './login.css';
import FormInput from "../../atoms/formInput/formInput";
import Button from "../../atoms/button/button";
import Pin from "../../molecules/pin/pin";
import ValidationMessage from "../../atoms/validationMessage/validationMessage";
import IconSpinner from "../../atoms/icons/spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {withRouter} from 'react-router';    // TODO not sure on best practice with router yet


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


    static defaultProps = {
        isStage: 1
    }


    render(className, props) {
        return (
            <div className={
                "Login"
                + this.getClassNameString()}
            >
                <TransitionGroup>
                    <CSSTransition
                        classNames={"fade-in"}
                        appear
                        timeout={200}
                        key={"1"}
                    >
                        <div className="main-content">
                            {this.render_email()}

                            {this.render_identity()}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
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

                    {this.render_email_cta()}
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

                    {this.render_verify_cta()}
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


    render_email_cta() {
        if (this.isLoading) {
            return (
                <Button
                    className="email-cta"
                    disabled={true}
                >
                    Login
                    <IconSpinner />
                </Button>
            );
        } else {
            return (
                <Button
                    className="email-cta"
                    disabled={!this.state.canGetUser}
                    onClick={
                        () => this.getUser()
                    }
                >
                    Login
                </Button>
            );
        }
    }


    render_verify_cta() {
        if (this.isLoading) {
            return (
                <Button
                    disabled={true}
                >
                    Enter
                    <IconSpinner />
                </Button>
            );
        } else {
            return (
                <Button
                    disabled={this.state.userPin.length < 4}
                    onClick={
                        () => this.validateUser()
                    }
                >
                    Enter
                </Button>
            );
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * getUser
     *
     */
    getUser() {
        alert("getUser clicked TODO integrate");
        this.isLoading = true;

        //  dummy a timeout on a lookup (IU testing, remove on integration)
        setTimeout(() => {
            this.isLoading = false;

            this.setState({
                isStage: 2
            });
        }, 1000);
    }


    /**
     * setUserEmail
     *
     * @param {KeyboardEvent} e
     */
    setUserEmail(e) {
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
        this.isLoading = true;

        //  dummy a timeout on a lookup (IU testing, remove on integration)
        setTimeout(() => {
            this.isLoading = false;

            this.setState({
                isStage: 1
            });
        }, 2000);

        this.props.history.push('/onboarding');
    }
}


export default withRouter(Login);