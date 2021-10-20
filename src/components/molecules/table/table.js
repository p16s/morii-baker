import BasicAtom from "../../atoms/basicAtom";
import './table.css';


class Table extends BasicAtom {
    render(className, props) {
        return (
            <table
                className={
                    "Table"
                    + this.padIfString(className)
                    + this.getClassNameString()
                }
            >
                <thead>
                    <tr>
                        {this.render_thead()}
                    </tr>
                </thead>

                <tbody>
                    {this.render_tbody()}
                </tbody>
            </table>
        );
    }


    render_thead() {
        return (this.props.thead ?? []).map((value, index) => {
            return (
                <th key={index}>{value}</th>
            );
        });
    }


    render_tbody() {
        return (this.props.tbody ?? []).map((value, index) => {
            return (
                <tr key={index}>
                    {this.render_tbody_td(value)}
                </tr>
            );
        });
    }


    render_tbody_td(value) {
        return value.map((content, index) => {
            return (
                <td key={index}>
                    {content}
                </td>
            )
        });
    }
}


export default Table;