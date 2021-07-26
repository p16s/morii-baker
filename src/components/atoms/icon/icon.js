import BasicAtom from "../basicAtom";
import "./icon.css";

class Icon extends BasicAtom {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Render element
     *
     * @return {*}
     */
    render() {
        return this.isActive()
            ? this.render_active() : this.render_inactive();
    }

    /**
     * Render active element
     * @return {*}
     */
    render_active() {
        return this.render_element('active');
    }

    /**
     * Render inactive element
     * @return {*}
     */
    render_inactive() {
        return this.render_element();
    }

    /**
     * Render element
     *
     * @param className
     * @return {JSX.Element}
     */
    render_element(className) {
        return (
            <div
                className={"Icon" + this.padIfString(className) + this.getClassNameString()}
                onClick={(e) => {
                    this.handleClick(e)
                }}
            >
                {this.render_element_img()}
                {this.render_element_letter()}
                {this.props.children}
            </div>
        );
    }

    /**
     * Render the image icon
     *
     * @returns {JSX.Element|string}
     */
    render_element_img() {
        return (typeof this.props.src === "string")
            ? (
                <img src={this.props.src} alt={this.props.alt ?? ''} />
            )
            : '';
    }

    /**
     * Render the icon with a letter
     *
     * @returns {JSX.Element|string}
     */
    render_element_letter() {
        return (typeof this.props.letter === 'string')
            ? (
                <div className={"letter"}>{this.props.letter.substring(0, 1).toUpperCase()}</div>
            )
            : '';
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleClick(e) {
        this.callbackOr(this.props.onClick)(e);
    }
}

export default Icon;