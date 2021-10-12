import BasicAtom from "../../atoms/basicAtom";
import "./filters.css";
import Button from "../../atoms/button/button";
import IconArrowDropdown from "../../atoms/icons/arrow-dropdown";
import {CSSTransition} from "react-transition-group";
import IconCheck from "../../atoms/icons/check";


class Filters extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            areFiltersVisible: false,
            parentVisible: this.props.preSelectedParent,
            childActive: -1
        };
    }

    /**
     * set some default props that we might want to change
     * @type {{preSelectedParent: number, ctaText: string}}
     */
    static defaultProps = {
        preSelectedParent: -1,
        ctaText: "Filters"
    }


    /**
     * main render
     */
    render(props) {
        /**
         * deconstruct some props
         */
        let { className } = this.props;
        let { ctaText } = this.props;

        return (
            <div
                className={
                    "Filters"
                    + this.padIfString(className)
                    + (this.state.areFiltersVisible ? " active " : '')
                }
            >
                <Button
                    className={this.state.areFiltersVisible ? "primary" : "outline"}
                    onClick={() => this.toggleShowFilters()}
                >
                    {ctaText}
                </Button>

                <CSSTransition
                    in={this.state.areFiltersVisible}
                    timeout={300}
                    classNames="fade-and-slide-in"
                    unmountOnExit
                >
                    <div className="lists-container">
                        {this.render_filter_list_parents()}
                    </div>
                </CSSTransition>
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

                        <CSSTransition
                            in={this.state.parentVisible === index}
                            timeout={100}
                            classNames="parent-animation"
                            unmountOnExit
                        >
                            <ul
                                className="list-parent"
                                key={"list-" + index}
                            >
                                {this.render_filter_list(opt.children)}
                            </ul>
                        </CSSTransition>
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
                        className={
                            "list-child"
                            +
                            (opt == this.props.activeFilters ? " active" : '')
                        }
                        onClick={() => {
                            this.props.onChildClick(opt, index);
                        }}
                        key={"item-" + index}
                    >
                        {opt}

                        {
                            opt == this.props.activeFilters
                                ?
                                    <IconCheck />
                                : ''
                        }
                    </li>
                );
            }
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * show the entire set of filters
     */
    toggleShowFilters() {
        //  first, check to see if we want to default show a parent then either show it or "rest" them closed every time
        if (this.props.preSelectedParent !== -1) {
            this.setState({
                areFiltersVisible: !this.state.areFiltersVisible
            })
        } else {
            this.setState({
                areFiltersVisible: !this.state.areFiltersVisible,
                parentVisible: -1,
            })
        }



    }


    /**
     * toggle each "parent" filter (show the nested children)
     * @param index
     */
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
}


export default Filters;