import BasicAtom from "../../atoms/basicAtom";
import "./filters.css";
import IconArrowDropdown from "../../atoms/icons/arrow-dropdown";


class Filters extends BasicAtom {
    /**
     * main render
     */
    render(props) {
        /**
         * deconstruct some props
         */
        let { className } = this.props;


        return (
            <>
                <div
                    className={
                        "Filters"
                        + this.padIfString(className)
                    }
                >
                    <select
                        onChange={() => {
                            this.handleOnChange(event)
                        }}
                    >
                        {this.render_option_list()}
                    </select>

                    <IconArrowDropdown />
                </div>

            </>
        );
    }


    /**
     *  options are passed in as props
     * @param options
     * @returns {unknown[]}
     */
    render_option_list() {
        /**
         * deconstruct the props we need
         */
        let { options, isSelected } = this.props;

        return (
            options ?? []).map((opt, index) => {
                return (
                    <option
                        value={opt.value}
                        key={"opt-"+ index}
                    >
                        {opt.value}
                    </option>
                );
            }
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Callback to pass value up
     *
     * @param {KeyboardEvent} e
     */
    handleOnChange(e) {
        let theValue = e.target.value;

        this.callbackOr(this.props.onChange)(theValue);
    }
}


export default Filters;