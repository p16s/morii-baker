import BasicAtom from "../../atoms/basicAtom";
import './table.css';


class Table extends BasicAtom {
    render(className, props) {
        return (
            <table
                className={
                    "Table "
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
                    <tr>
                        {this.render_tbody()}
                    </tr>
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
                <td key={index}>{value}</td>
            );
        });
    }
}


export default Table;