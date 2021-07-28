import Alert from "../alert";
import BakerExample from "../../../../helpers/bakerExample";


class AlertExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Alerts

                    <a
                        href={"https://www.figma.com/file/TyaSwVfNEDdQcodIuFs8DR/Baskerville-2.0?node-id=41%3A335"}
                        target={"_blank"}
                    >
                        [Documentation]
                    </a>
                </h1>

                {this.render_basic()}
                {this.render_icon()}
                {this.render_error()}
                {this.render_error_icon()}
                {this.render_success()}
                {this.render_success_icon()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Alert / Info / Normal',
            <Alert
                text={"Default (info) message"}
                onClick={() => {console.log('clicked Alert');}}
            />,
            'Default alert.  With click event.'
        );
    }


    render_icon() {
        return this.render_exampleComponent(
            'Alert / Info / Icon',
            <Alert
                text={"Default with icon"}
                onClick={() => {
                    console.log('clicked Alert');
                }}
            >
                {/* this icon would come from a package/component and is only used here as an titleBar.js   */}
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M8.50016 0.583313C4.13016 0.583313 0.583496 4.12998 0.583496 8.49998C0.583496 12.87 4.13016 16.4166 8.50016 16.4166C12.8702 16.4166 16.4168 12.87 16.4168 8.49998C16.4168 4.12998 12.8702 0.583313 8.50016 0.583313ZM7.7085 4.54164V6.12497H9.29183V4.54164H7.7085ZM7.7085 7.7083V12.4583H9.29183V7.7083H7.7085ZM2.16683 8.49997C2.16683 11.9912 5.00891 14.8333 8.50016 14.8333C11.9914 14.8333 14.8335 11.9912 14.8335 8.49997C14.8335 5.00872 11.9914 2.16664 8.50016 2.16664C5.00891 2.16664 2.16683 5.00872 2.16683 8.49997Z"
                          fill="#1C00CA"/>
                </svg>
            </Alert>,
            'Default with icon passed in. With click event.'
        );
    }


    render_error() {
        return this.render_exampleComponent(
            'Alert / Error / Normal',
            <Alert
                text={"Default error"}
                className={'error'}
                onClick={() => {
                    console.log('clicked Alert');
                }}
            />,
            'Default error. With click event.'
        );
    }


    render_error_icon() {
        return this.render_exampleComponent(
            'Alert / Error / Icon',
            <Alert
                text={"Error icon"}
                className={'error'}
                onClick={() => {
                    console.log('clicked Alert');
                }}
            >
                {/* this icon would come from a package/component and is only used here as an titleBar.js   */}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.54708 0.375H10.4529L14.625 4.54708V10.4529L10.4529 14.625H4.54708L0.375 10.4529V4.54708L4.54708 0.375ZM9.79583 13.0417L13.0417 9.79583V5.20417L9.79583 1.95833H5.20417L1.95833 5.20417V9.79583L5.20417 13.0417H9.79583ZM7.5 9.875C7.06277 9.875 6.70833 10.2294 6.70833 10.6667C6.70833 11.1039 7.06277 11.4583 7.5 11.4583C7.93723 11.4583 8.29167 11.1039 8.29167 10.6667C8.29167 10.2294 7.93723 9.875 7.5 9.875ZM8.29167 3.54167H6.70833V9.08333H8.29167V3.54167Z" fill="#CF0057"/>
                </svg>
            </Alert>,
            'Default error with icon passed in. With click event.'
        );
    }


    render_success() {
        return this.render_exampleComponent(
            'Alert / Success / Normal',
            <Alert
                text={"Default success"}
                className={'success'}
                onClick={() => {
                    console.log('clicked Alert');
                }}
            />,
            'Default success. With click event.'
        );
    }


    render_success_icon() {
        return this.render_exampleComponent(
            'Alert / Success / Icon',
            <Alert
                text={"Error icon"}
                className={'success'}
                onClick={() => {
                    alert('clicked Alert');
                }}
            >
                {/* this icon would come from a package/component and is only used here as an titleBar.js   */}
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.50016 0.583313C4.13016 0.583313 0.583496 4.12998 0.583496 8.49998C0.583496 12.87 4.13016 16.4166 8.50016 16.4166C12.8702 16.4166 16.4168 12.87 16.4168 8.49998C16.4168 4.12998 12.8702 0.583313 8.50016 0.583313ZM8.50016 14.8333C5.00891 14.8333 2.16683 11.9912 2.16683 8.49997C2.16683 5.00872 5.00891 2.16664 8.50016 2.16664C11.9914 2.16664 14.8335 5.00872 14.8335 8.49997C14.8335 11.9912 11.9914 14.8333 8.50016 14.8333ZM6.91683 10.2179L12.1339 5.00079L13.2502 6.12496L6.91683 12.4583L3.75016 9.29163L4.86641 8.17538L6.91683 10.2179Z" fill="#05C496"/>
                </svg>
            </Alert>,
            'Default success with icon passed in. With click event.'
        );
    }
}


export default AlertExample;