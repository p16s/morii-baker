import { Link, useLocation } from "react-router-dom";
import './nav.css';
import ListItem from "../../atoms/listItem/listItem";


const Nav = () => {
    const location = useLocation();

    return (
        <nav>
            <ul className={'site-nav'}>
                <ListItem active={(location.pathname === '/')}>
                    <Link to="/">
                        Theme
                    </Link>
                </ListItem>

                <ListItem active={(location.pathname === '/atoms')}>
                    <Link to="/atoms">
                        Atoms
                    </Link>
                </ListItem>

                <ListItem active={(location.pathname === '/molecules')}>
                    <Link to="/molecules">
                        Molecules
                    </Link>
                </ListItem>

                <ListItem active={(location.pathname === '/organisms')}>
                    <Link to="/organisms">
                        Organisms
                    </Link>
                </ListItem>

                <ListItem active={(location.pathname === '/templates')}>
                    <Link to="/templates">
                        Templates
                    </Link>
                </ListItem>

                <ListItem active={(location.pathname === '/components')}>
                    <Link to="/pages">
                        Pages
                    </Link>
                </ListItem>
            </ul>
        </nav>
    );
}


export default Nav;