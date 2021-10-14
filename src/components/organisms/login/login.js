// import BasicAtom from "../../atoms/basicAtom";
// import './login.css';
// import FormInput from "../../atoms/formInput/formInput";
// import Button from "../../atoms/button/button";
// import Pin from "../../molecules/pin/pin";
// import IconSpinner from "../../atoms/icons/spinner";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import {useHistory} from "react-router-dom";
// import { withRouter } from 'react-router';
// import moriiApp from "../../../../../MoriiApp";
// import React from "react";
// import Toast from "../../molecules/toast/toast";
// import MoriiApp from "../../../../../MoriiApp";
//
//
// class LoginAtom extends BasicAtom {
//     constructor(props, context) {
//         super(props, context, {
//             isStage: props.isStage,
//             canGetUser: true,
//             userEmail: "",
//             userEmailError: false,
//             userPin: '',
//             verificationCode: '',
//             isToastShowing: false,
//             toastMessage: ""
//         });
//     }
//
//
//     /**
//      * default prop values
//      * @type {{isStage: number}}
//      */
//     static defaultProps = {
//         isStage: 1
//     }
//
//
//     /**
//      * main render
//      * @param className
//      * @param props
//      * @returns {JSX.Element}
//      */
//     render(className, props) {
//         return (
//             <div className={
//                 "Login"
//                 + this.getClassNameString()}
//             >
//                 <CSSTransition
//                     in={true}
//                     classNames={"fade-in"}
//                     appear
//                     timeout={200}
//                 >
//                     <div className="main-content">
//                         {this.render_sso()}
//
//                         {this.render_email()}
//
//                         {this.render_identity()}
//                     </div>
//                 </CSSTransition>
//
//                 <Toast
//                     isVisible={this.state.isToastShowing}
//                     type={"error"}
//                     stoppedShowing={(e) => {
//                         this.setState({
//                             isToastShowing: false,
//                             toastMessage: ""
//                         });
//                     }}
//                 >
//                     {this.state.toastMessage}
//                 </Toast>
//             </div>
//         );
//     }
//
//
//     /**
//      * allow users to use other accounts
//      * @returns {JSX.Element}
//      */
//     render_sso() {
//         if (this.state.isStage === 1) {
//             return (
//                 <div>
//                     <h1>Sign in to Purposeful</h1>
//
//                     <div id="googleLogin"/>
//
//                     <Button
//                         className="ms-login"
//                         onClick={() => {
//                             MoriiApp.auth.loginRequestMs().then(
//                                 (response) => {
//                                     console.log('request', response);
//                                     if (response?.redirect) {
//                                         window.location = response.redirect;
//                                     } else {
//                                         console.log('ERROR: problem getting MS redirect URL');
//                                     }
//                                 }
//                             );
//                         }}
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><title>MS-SymbolLockup</title><rect x="1" y="1" width="9" height="9" fill="#f25022"/><rect x="1" y="11" width="9" height="9" fill="#00a4ef"/><rect x="11" y="1" width="9" height="9" fill="#7fba00"/><rect x="11" y="11" width="9" height="9" fill="#ffb900"/></svg>
//                         Sign in with Microsoft
//                     </Button>
//
//                     <p className="alternatively">Alternatively you can also sign in with your email address</p>
//                 </div>
//             );
//         }
//     }
//
//
//     /**
//      * render email UI
//      * @returns {JSX.Element}
//      */
//     render_email() {
//         if (this.state.isStage === 1) {
//             return (
//                 <>
//                     <FormInput
//                         type="email"
//                         placeholder="Enter your email"
//                         value={this.props.valueEmail}
//                         onChange={(e) => {
//                             this.setUserEmail(e);
//                         }}
//                         onEnter={(e) => {
//                             this.getUser();
//                         }}
//                     />
//
//                     {this.render_email_cta()}
//                 </>
//             );
//         }
//     }
//
//
//     /**
//      * render the stage 1, email CTA, different UI based on state
//      * @returns {JSX.Element}
//      */
//     render_email_cta() {
//         return (
//             <Button
//                 className="email-cta"
//                 disabled={this.isLoading || !this.state.canGetUser || !this.state.userEmail.length}
//                 onClick={
//                     () => this.getUser()
//                 }
//             >
//                 Sign in with Email
//                 {
//                     this.isLoading
//                         ?
//                         <IconSpinner />
//                         : ''
//                 }
//             </Button>
//         );
//     }
//
//
//     /**
//      * render indentity UI
//      * @returns {JSX.Element}
//      */
//     render_identity() {
//         if (this.state.isStage === 2) {
//             return (
//                 <>
//                     <h1>Verify your identity</h1>
//
//                     <p>Check your email for the verification code</p>
//
//                     <Pin
//                         length={6}
//                         labelText={"Your verification code"}
//                         onChange={(e) => {
//                             this.setVerificationCode(e);
//                         }}
//                     />
//
//                     <br />
//                     <br />
//
//                     <Pin
//                         labelText={"Your PIN number"}
//                         onChange={(e) => {
//                             this.setUserPin(e);
//                         }}
//                     />
//
//                     <aside className="main-cta-container">
//                         {/*<Button*/}
//                         {/*    className="outline"*/}
//                         {/*    onClick={() => {*/}
//                         {/*        this.setState({*/}
//                         {/*            isStage: 1*/}
//                         {/*        })*/}
//                         {/*    }}*/}
//                         {/*>*/}
//                         {/*    Back*/}
//                         {/*</Button>*/}
//                         {this.render_verify_cta()}
//                     </aside>
//                 </>
//             );
//         }
//     }
//
//
//     /**
//      * render the stage 2, verify CTA, different UI based on state
//      * @returns {JSX.Element}
//      */
//     render_verify_cta() {
//         return (
//             <Button
//                 disabled={this.isLoading || this.state.userPin.length < 4 || this.state.verificationCode.length < 6}
//                 onClick={
//                     () => this.validateUser()
//                 }
//             >
//                 Enter
//                 {
//                     this.isLoading
//                         ?
//                         <IconSpinner />
//                         : ''
//                 }
//             </Button>
//         );
//     }
//
//
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     // Handlers
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     /**
//      * getUser
//      *
//      */
//     getUser() {
//         this.isLoading = true;
//
//         moriiApp.auth.loginRequest(this.state.userEmail)
//             .then((response) => {
//                 if (response === true) {
//                     this.setState({
//                         isStage: 2
//                     });
//                 } else {
//                     this.setState({
//                         isToastShowing: true,
//                         toastMessage: "Problem logging in. Please check the email address"
//                     });
//                 }
//             })
//             .finally(() => {
//                 this.isLoading = false;
//             });
//     }
//
//
//     /**
//      * setUserEmail
//      *
//      * @param {KeyboardEvent} e
//      */
//     setUserEmail(e) {
//         this.setState({
//             userEmail: e
//         });
//
//         //  pass data out TODO not working since moving to a HOC
//         this.callbackOr(this.props.userEmail)(e);
//     }
//
//
//     /**
//      * setUserPin
//      *
//      * @param {KeyboardEvent} e
//      */
//     setUserPin(e) {
//         this.setState({
//             userPin: e
//         });
//
//         //  pass data out TODO not working since moving to a HOC
//         this.callbackOr(this.props.userPin)(e);
//     }
//
//     /**
//      * setVerificationCode
//      *
//      * @param {KeyboardEvent} e
//      */
//     setVerificationCode(e) {
//         this.setState({
//             verificationCode: e
//         });
//
//         //  pass data out TODO not working since moving to a HOC
//         this.callbackOr(this.props.verificationCode)(e);
//     }
//
//
//     /**
//      * validateUser
//      *
//      * @param {KeyboardEvent} e
//      */
//     validateUser() {
//         this.isLoading = true;
//
//         moriiApp.auth.login(
//             this.state.userEmail,
//             this.state.userPin,
//             this.state.verificationCode
//         ).catch((error) => {
//             this.setState({
//                 isToastShowing: true,
//                 toastMessage: "Invalid PIN or verification code"
//             });
//
//             this.isLoading = false;
//             return Promise.reject(error);
//         }).then((val) => {
//             //  TODO not working since moving to a HOC
//             this.callbackOr(this.props.onLogin)(val);
//         });
//     }
// }
//
//
// const Login = (props) => {
//     const history = useHistory();
//
//     const loginFunc = (val) => {
//         moriiApp.user.getUser().then(
//             (user) => {
//                 if (user.phone === null) {
//                     history.push('/onboarding');
//                 } else {
//                     history.push('/');
//                     window.location.reload();
//                 }
//                 return user;
//             }
//         )
//     }
//
//     return (<LoginAtom onLogin={loginFunc} />)
// }
//
//
// export default withRouter(Login);