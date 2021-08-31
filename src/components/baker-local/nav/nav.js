import { Link, useLocation } from "react-router-dom";
import './nav.css';
import ListItem from "../../atoms/listItem/listItem";


const Nav = () => {
    const location = useLocation();

    return (
        <nav>
            <ul className={'site-nav'}>
                <Link to="/">
                    <ListItem active={(location.pathname === '/')}>
                        Theme
                    </ListItem>
                </Link>

                <Link to="/atoms">
                    <ListItem active={(location.pathname === '/atoms')}>
                        Atoms
                    </ListItem>
                </Link>

                <Link to="/molecules">
                    <ListItem active={(location.pathname === '/molecules')}>
                        Molecules
                    </ListItem>
                </Link>

                <Link to="/organisms">
                    <ListItem active={(location.pathname === '/organisms')}>
                        Organisms
                    </ListItem>
                </Link>

                <Link to="/templates">
                    <ListItem active={(location.pathname === '/templates')}>
                        Templates
                    </ListItem>
                </Link>

                <Link to="/pages">
                    <ListItem active={(location.pathname === '/components')}>
                        Pages
                    </ListItem>
                </Link>
            </ul>
        </nav>
    );
}


export default Nav;