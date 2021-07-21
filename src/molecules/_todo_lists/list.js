import React from "react";
import BasicAtom from "../basicAtom";
import './list.css';


class List extends BasicAtom {
    render(text, className) {
        return (
            this.render_standard()
        )
    }


    render_standard() {
        return this.render_element();
    }


    render_element(className, props) {
        return React.cloneElement(
            <>
                {this.props.lists.map((list) => (
                    <li
                        className={
                            "List "
                            + this.padIfString(className) + this.getClassNameString()
                        }
                        href={list.slug}
                        title={"Link to " + list.title}
                        target={(list.open_new ? '_blank' : '')}
                        rel={(list.open_new ? 'noopener nofollow' : '')}
                        key={list.id}
                    >
                        {list.title}
                    </li>
                ))}
            </>,
            props ?? {}
        );
    }
}


export default List;
