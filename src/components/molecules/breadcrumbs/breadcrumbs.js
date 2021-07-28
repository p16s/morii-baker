import BasicAtom from "../../atoms/basicAtom";
import "./breadcrumbs.css";


class Breadcrumbs extends BasicAtom {
    render() {
        return (
            <div className={"Breadcrumbs"}>
                {this.render_logo()}
                {this.render_crumbs()}
            </div>
        );
    }


    render_logo() {
        if (typeof this.props.logo !== 'undefined' && this.props.logo !== null) {
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