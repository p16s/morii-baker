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
                    {this.render_filter_list_parents()}
                </div>

            </>
        );
    }


    /**
     * each parent "list"
     * @returns {unknown[]}
     */
    render_filter_list_parents() {
        /**
         * deconstruct the props we need
         */
        let { options, isSelected } = this.props;

        return (
            options ?? []).map((opt, index) => {
                return (
                    <div
                        className="list-container"
                        key={"list-" + index}
                    >
                        <p>{opt.list_title}</p>

                        <ul
                            className="list-parent"
                        >
                            {this.render_filter_list(opt.children)}
                        </ul>
                    </div>
                );
            }
        );
    }


    /**
     * each child of the parent
     * @param opt
     * @returns {unknown[]}
     */
    render_filter_list(opt) {
        return (
            opt ?? []).map((opt, index) => {
                return (
                    <li
                        className="list-child"
                        key={"item-" + index}
                    >
                        {opt}
                    </li>
                );
            }
        );
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleOnClick(e) {
        console.log("handleOnClick", e);
    }


    // /**
    //  * Callback to pass value up
    //  *
    //  * @param {KeyboardEvent} e
    //  */
    // handleOnChange(e) {
    //     let theValue = e.target.value;
    //
    //     this.callbackOr(this.props.onChange)(theValue);
    // }
}


export default Filters;