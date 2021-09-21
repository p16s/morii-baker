import BasicAtom from "../../atoms/basicAtom";
import "./breadcrumbs.css";


class Breadcrumbs extends BasicAtom {
    render(className, props) {
        if (this.props.breadcrumbs && this.props.breadcrumbs.length) {
            return (
                <nav
                    className={
                        "Breadcrumbs"
                        + this.padIfString(className)
                        + this.getClassNameString()
                    }
                >
                    {this.render_logo()}
                    {this.render_crumbs()}
                </nav>
            );
        } else {
            return null
        }
    }


    render_logo() {
        if (this.props.logo && this.props.logo.length ) {
            return (
                <img
                    className={"logo"}
                    src={this.props.logo}
                    alt={this.props.logoAlt ?? "Logo"}
                />
            )
        }

        return ("");
    };


    render_crumbs() {
        return (this.props.breadcrumbs ?? []).map((breadcrumb, key) => {
            return this.render_crumb(breadcrumb, key);
        });
    }


    render_crumb(breadcrumb, key) {
        return (
            <a
                className={"breadcrumb"}
                href={breadcrumb.slug}
                title={breadcrumb.title}
                key={key}
            >
                {breadcrumb.title}
            </a>
        );
    }
}


export default Breadcrumbs;