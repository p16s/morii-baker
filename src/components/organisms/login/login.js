import BasicAtom from "../../atoms/basicAtom";
import './login.css';
import FormInput from "../../atoms/formInput/formInput";
import Button from "../../atoms/button/button";
import Pin from "../../molecules/pin/pin";
import IconSpinner from "../../atoms/icons/spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {useHistory} from "react-router-dom";
import { withRouter } from 'react-router';
import moriiApp from "../../../../../MoriiApp";
import React from "react";
import Toast from "../../molecules/toast/toast";


class LoginAtom extends BasicAtom {
    constructor(props, context) {
        super(props, context, {
            isStage: props.isStage,
            canGetUser: true,
            userEmail: "",
            userEmailError: false,
            userPin: '',
            verificationCode: '',
            isToastShowing: false,
            toastMessage: ""
        });
    }


    static defaultProps = {
        isStage: 1
    }


    /**
     * main render
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <div className={
                "Login"
                + this.getClassNameString()}
            >
                    <CSSTransition
                        in={true}
                        classNames={"fade-in"}
                        appear
                        timeout={200}
                    >
                        <div className="main-content">
                            {this.render_sso()}

                            {this.render_email()}

                            {this.render_identity()}
                        </div>
                    </CSSTransition>
            </div>
        );
    }


    /**
     * allow users to use other accounts
     * @returns {JSX.Element}
     */
    render_sso() {
        return (
            <div>
                <h1>Sign in to Messages</h1>

                <div id="googleLogin" />

                <p className="alternatively">Alternatively you can also sign in with your email address</p>
            </div>
        );
    }


    /**
     * render email UI
     * @returns {JSX.Element}
     */
    render_email() {
        if (this.state.isStage === 1) {
            return (
                <>
                    <FormInput
                        type="email"
                        placeholder="Enter your email"
                        value={this.props.valueEmail}
                        onChange={(e) => {
                            this.setUserEmail(e);
                        }}
                        onEnter={(e) => {
                            this.getUser();
                        }}
                    />

                    {this.render_email_cta()}

                    <Toast
                        isVisible={this.state.isToastShowing}
                        type={"error"}
                        stoppedShowing={(e) => {
                            this.setState({
                                isToastShowing: false,
                                toastMessage: ""
                            });
                        }}
                    >
                        {this.state.toastMessage}
                    </Toast>
                </>
            );
        }
    }


    /**
     * render the stage 1, email CTA, different UI based on state
     * @returns {JSX.Element}
     */
    render_email_cta() {
        if (this.isLoading) {
            return (
                <Button
                    className="email-cta"
                    disabled={true}
                >
                    Sign in with Email
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
                    Sign in with Email
                </Button>
            );
        }
    }


    /**
     * render indentity UI
     * @returns {JSX.Element}
     */
    render_identity() {
        if (this.state.isStage === 2) {
            return (
                <>
                    <h1>Verify your identity</h1>

                    <p>Check your email for the verification code</p>

                    <Pin
                        length={6}
                        labelText={"Your verification code"}
                        onChange={(e) => {
                            this.setVerificationCode(e);
                        }}
                    />

                    <br />
                    <br />

                    <Pin
                        labelText={"Your PIN number"}
                        onChange={(e) => {
                            this.setUserPin(e);
                        }}
                    />

                    {this.render_verify_cta()}
                </>
            );
        }
    }


    /**
     * render the stage 2, verify CTA, different UI based on state
     * @returns {JSX.Element}
     */
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
                    disabled={this.state.userPin.length < 4 || this.state.verificationCode.length < 6}
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
        this.isLoading = true;

        moriiApp.auth.loginRequest(this.state.userEmail)
            .then((response) => {
                if (response === true) {
                    this.setState({
                        isStage: 2
                    });
                } else {
                    this.setState({
                        isToastShowing: true,
                        toastMessage: "Problem logging in. Please check the email address"
                    });
                }
             })
            .finally(() => {
                this.isLoading = false;
            });


        console.log("pass to parent");
        this.callbackOr(this.props.noLongerInitialLoginScreen)("some");
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

        //  pass data out
        this.callbackOr(this.props.userEmail)(e);
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

        //  pass data out
        this.callbackOr(this.props.userPin)(e);
    }

    /**
     * setVerificationCode
     *
     * @param {KeyboardEvent} e
     */
    setVerificationCode(e) {
        this.setState({
            verificationCode: e
        });

        //  pass data out
        this.callbackOr(this.props.verificationCode)(e);
    }


    /**
     * validateUser
     *
     * @param {KeyboardEvent} e
     */
    validateUser() {
        this.isLoading = true;

        moriiApp.auth.login(
            this.state.userEmail,
            this.state.userPin,
            this.state.verificationCode
        ).catch((error) => {
            alert('Invalid PIN or verification code');

            this.isLoading = false;
            return Promise.reject(error);
        }).then((val) => {
            this.callbackOr(this.props.onLogin)(val);
        });
    }
}


const Login = (props) => {
    const history = useHistory();

    const loginFunc = (val) => {
        moriiApp.user.getUser().then(
            (user) => {
                if (user.phone === null) {
                    history.push('/onboarding');
                } else {
                    history.push('/');
                    window.location.reload();
                }
                return user;
            }
        )
    }

    return (<LoginAtom onLogin={loginFunc} />)
}


export default withRouter(Login);