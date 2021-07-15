import BasicAtom from "../basicAtom";
import PropTypes from "prop-types";


class Label extends BasicAtom {
    render() {
        return this.render_element(this.props.children);
    }


    render_element(text, className) {
        return (
          <label
              className={"Label" + this.padIfString(className) + this.getClassNameString()}
              htmlFor={this.props.for}
          >
              {text}
          </label>
        );
    }
}

Label.propTypes = {
    for: PropTypes.string.isRequired
}


export default Label;