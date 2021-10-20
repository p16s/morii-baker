import BasicAtom from "../../atoms/basicAtom";
import './tableGrid.css';
import IconArrowDropdown from "../../atoms/icons/arrow-dropdown";
import Button from "../../atoms/button/button";
import React from "react";


class TableGrid extends BasicAtom {
    /**
     * local state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            activeRow: -1
        };
    }


    /**
     * component render
     * build the component
     * @param className
     * @param props
     * @returns {JSX.Element}
     */
    render(className, props) {
        return (
            <section
                className={
                    "Table-grid"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                {this.render_rows()}
            </section>
        );
    }


    /**
     * a "row" for each set of data
     * @returns {unknown[]}
     */
    render_rows() {
        return (
            this.props.tbody ?? []).map((value, index) => {
                return (
                    <div
                        className={
                            "row"
                            + (index === this.state.activeRow ? ' active' : '')
                        }
                        key={'row-' + index}
                    >
                        {this.render_thead()}
                        <span className={'th-' + (this.props.thead.length + 1)}>Expand</span>

                        {this.render_tbody(value)}
                        <span
                            className={'td-' + (this.props.thead.length + 1)}
                            onClick={() => {
                                if (this.state.activeRow == index) {
                                    this.setState({
                                        activeRow: -1
                                    });
                                } else {
                                    this.setState({
                                        activeRow: index
                                    })
                                }
                            }}
                        >
                            <Button className="outline icon">
                                <IconArrowDropdown />
                            </Button>
                        </span>
                    </div>
                );
            }
        );
    }


    /**
     * render the pseudo head
     * @returns {unknown[]}
     */
    render_thead() {
        return (this.props.thead ?? []).map((value, index) => {
            return (
                <span
                    className={'th-' + (index + 1)}
                    key={index}
                >
                    {value}
                </span>
            );
        });
    }


    /**
     * render the pseudo body
     * @param value
     * @returns {unknown[]}
     */
    render_tbody(value) {
        return (value ?? []).map((value, index) => {
            return (
                <span
                    className={'td-' + (index + 1)}
                    key={index}
                >
                        {value}
                </span>
            );
        });
    }
}


export default TableGrid;