import BakerExample from "../../../../helpers/bakerExample";
import Button from "../button";


class ButtonExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    Buttons

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=4%3A745"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_basic()}
                {this.render_disabled()}
                {this.render_outline()}
                {this.render_outline_disabled()}
                {this.render_minimal()}
                {this.render_minimal_disabled()}
                {this.render_icon()}
                {this.render_icon_disabled()}
            </section>
        );
    }


    render_basic() {
        return this.render_exampleComponent(
            'Primary / Test',
            <Button
                text={'Normal button'}
                onClick={() => {alert('button clicked');}}
            />,
             'Test button.'
        );
    }


    render_disabled() {
        return this.render_exampleComponent(
            'Primary / Test / Disabled',
            <Button
                text={'Disabled button'}
                onClick={() => {alert('button clicked');}}
                disabled={true}
            />,
            'Disabled button.'
        );
    }


    render_outline() {
        return this.render_exampleComponent(
            'Primary / Outline',
            <Button
                text={'Outline button'}
                className={"outline"}
                onClick={() => {alert('button clicked');}}
            />,

            'For less important actions.'
        );
    }


    render_outline_disabled() {
        return this.render_exampleComponent(
            'Primary / Outline / Disabled',
            <Button
                text={'Disabled outline button'}
                className={"outline"}
                onClick={() => {alert('button clicked');}}
                disabled={true}
            />,
            'Disabled button.'
        );
    }


    render_minimal() {
        return this.render_exampleComponent(
            'Primary / Minimal',
            <Button
                text={'Minimal button'}
                className={"minimal"}
                onClick={() => {alert('button clicked');}}
            />,
            'NoDataMessage without lines or background.'
        );
    }


    render_minimal_disabled() {
        return this.render_exampleComponent(
            'Primary / Minimal / Disabled',
            <Button
                text={'Minimal disbaled button'}
                className={"minimal"}
                onClick={() => {alert('button clicked');}}
                disabled={true}
            />,
            'NoDataMessage without lines or background.'
        );
    }


    render_icon() {
        return this.render_exampleComponent(
            'As icon',
            <Button
                className={"secondary round"}
                onClick={() => {alert('button clicked');}}
            >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.2079 6.10571H5.95076V9.57714H4.03076V6.10571H0.790759V4.38286H4.03076V0.92H5.95076V4.38286H9.2079V6.10571Z" fill="white"/>
                </svg>
            </Button>,
            'NoDataMessage with just an icon'
        );
    }


    render_icon_disabled() {
        return this.render_exampleComponent(
            'As icon / Disabled',
            <Button
                className={"secondary round"}
                onClick={() => {alert('button clicked');}}
                disabled={true}
            >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.2079 6.10571H5.95076V9.57714H4.03076V6.10571H0.790759V4.38286H4.03076V0.92H5.95076V4.38286H9.2079V6.10571Z" fill="white"/>
                </svg>
            </Button>,
            'NoDataMessage, disabled, with icon and secondary class'
        );
    }
}


export default ButtonExample;