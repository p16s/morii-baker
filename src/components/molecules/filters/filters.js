import BasicAtom from "../../atoms/basicAtom";
import "./filters.css";
import Button from "../../atoms/button/button";
import IconArrowDropdown from "../../atoms/icons/arrow-dropdown";


class Filters extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            areFiltersVisible: true,
            parentVisible: -1
        };
    }


    /**
     * main render
     */
    render(props) {
        /**
         * deconstruct some props
         */
        let { className } = this.props;

        return (
            <div
                className={
                    "Filters"
                    + this.padIfString(className)
                }
            >
                <Button
                    className="outline"
                    onClick={() => this.toggleShowFilters()}
                >
                    Filters
                </Button>

                {
                    this.state.areFiltersVisible
                        ?
                            <div className="lists-container">
                                {this.render_filter_list_parents()}
                            </div>
                        : null
                }

            </div>
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
        let { options } = this.props;

        return (
            options ?? []).map((opt, index) => {
                return (
                    <div
                        className={
                            "list-group"
                            + (this.state.parentVisible === index ? ' active' : '')
                        }

                        key={"list-" + index}
                    >
                        <p
                            className="list-title"
                            onClick={() => {
                                this.toggleShowParent(index);
                            }}
                        >
                            <IconArrowDropdown />
                            {opt.list_title}
                        </p>

                        <ul className="list-parent">
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
                        onClick={(opt) => {
                            this.props.onChildClick(opt);
                        }}
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


    toggleShowFilters() {
        this.setState({
            areFiltersVisible: !this.state.areFiltersVisible
        })
    }


    toggleShowParent(index) {
        if (index !== this.state.parentVisible) {
            this.setState({
                parentVisible: index
            });
        } else {
            this.setState({
                parentVisible: -1
            });

        }
    }


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