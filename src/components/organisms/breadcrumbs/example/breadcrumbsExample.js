import BakerExample from "../../../../helpers/bakerExample";
import Breadcrumbs from "../breadcrumbs";


class BreadcrumbsExample extends BakerExample {
    render() {
        return (
            <section className={"examples"}>
                <h1>
                    [Breadcrumbs]

                    <a
                        href={"https://www.figma.com/file/VGOOy8mKPEs7hxW8gAqe60/Baskerville-Documentation?node-id=22%3A723"}
                        target={"_blank"}
                    >
                        Documentation
                    </a>
                </h1>

                {this.render_normal()}
                {this.render_with_logo()}
            </section>
        )
    };


    render_normal() {
        return this.render_exampleComponent(
            "Breadcrumbs/Normal",
            <Breadcrumbs
                breadcrumbs={
                    [
                        {
                            "title": "Crumb 1",
                            "slug": "https://p16s.co/morii/"
                        },
                        {
                            "title": "Crumb 2",
                            "slug": "https://p16s.co/morii/"
                        },
                        {
                            "title": "Crumb 3",
                        }
                    ]
                }
            />,
            ""
        )
    };


    render_with_logo() {
        return this.render_exampleComponent(
            "Breadcrumbs/Normal",
            <Breadcrumbs
                breadcrumbs={
                    [
                        {
                            "title": "Crumb 1",
                            "slug": "https://p16s.co/morii/"
                        },
                        {
                            "title": "Crumb 2",
                            "slug": "https://p16s.co/morii/"
                        },
                        {
                            "title": "Crumb 3",
                        }
                    ]
                }
                logo={'https://app.morii.io/favicon.png'}
            />,
            "With logo"
        )
    };
}


export default BreadcrumbsExample;