import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    NavLink,
    useLocation
} from "react-router-dom";
import Nav from "./components/baker-local/nav/nav";
import ThemeDemo from "./components/baker-local/themeDemo/themeDemo";
import PageAtoms from "./pages/atoms";
import PageMolecules from "./pages/molecules";
import PageOrganisms from "./pages/organisms";
import PageTemplates from "./pages/templates";


const App = () => {
    return (
        <>
            <Router>
                <Nav />

                <Switch>
                    <Route
                        path="/"
                        exact
                    >
                        <ThemeDemo />
                    </Route>

                    <Route path="/atoms">
                        <PageAtoms />
                    </Route>

                    <Route path="/molecules">
                        <PageMolecules />
                    </Route>

                    <Route path="/organisms">
                        <PageOrganisms />
                    </Route>

                    <Route path="/templates">
                        <PageTemplates />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}


export default App;








// import React from "react";
// import {
//     BrowserRouter as Router,
//     Route,
//     Switch,
//     Link,
//     NavLink,
//     useLocation
// } from "react-router-dom";
//
// import ThemeDemo from "./components/themeDemo/themeDemo";
// import ListItem from "./components/atoms/listItem/listItem";
//
// import PageAtoms from "./pages/atoms";
// import PageMolecules from "./pages/molecules";
// import PageOrganisms from "./pages/organisms";
//
//
//
//
// class App extends React.Component {
//
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     // Render
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     /**
//      * Conditional render page using router
//      *
//      * @return {*}
//      */
//     render(props) {
//         return (
//             <Router>
//                 {this.render_nav()}
//                 <Switch>
//                     <Route
//                         path="/"
//                         exact
//                     >
//                         <ThemeDemo />
//                     </Route>
//
//
//                     <Route path="/atoms">
//                         <PageAtoms />
//                     </Route>
//
//                     <Route path="/molecules">
//                         <PageMolecules />
//                     </Route>
//
//                     <Route path="/organisms">
//                         <PageOrganisms />
//                     </Route>
//                 </Switch>
//             </Router>
//         );
//     }
//
//
//     /**
//      * Render a nav to change the route
//      *
//      * @return {*}
//      */
//     render_nav() {
//         console.log("render_nav");
//
//         return (
//             <nav>
//                 <h1>LOCATION:
//                     {/*<MousePosition />*/}
//                 </h1>
//
//
//                 <ul className={'site-nav'}>
//                     <ListItem
//                         // active={(this.state.isShowing === 'theme')}
//                         // onClick={() => this.handleClick('theme')}
//                     >
//                         <Link to="/">
//                             Theme
//                         </Link>
//                     </ListItem>
//
//
//                     <ListItem
//                         // active={(this.location.pathname === '/atoms')}
//                     >
//                         <Link to="/atoms">
//                             Atoms
//                         </Link>
//                         {/*<NavLink*/}
//                         {/*    to="/atoms"*/}
//                         {/*    activeClassName="nav-link-active"*/}
//                         {/*>*/}
//                         {/*    Atoms*/}
//                         {/*</NavLink>*/}
//                     </ListItem>
//                     {/*<ListItem*/}
//                     {/*    active={(this.state.isShowing === 'atoms')}*/}
//                     {/*    onClick={() => this.handleClick('atoms')}*/}
//                     {/*>*/}
//                     {/*    Atoms*/}
//                     {/*</ListItem>*/}
//                     {/*<ListItem*/}
//                     {/*    active={(this.state.isShowing === 'molecules')}*/}
//                     {/*    onClick={() => this.handleClick('molecules')}*/}
//                     {/*>*/}
//                     {/*    Molecules*/}
//                     {/*</ListItem>*/}
//                     {/*<ListItem*/}
//                     {/*    active={(this.state.isShowing === 'organisms')}*/}
//                     {/*    onClick={() => this.handleClick('organisms')}*/}
//                     {/*>*/}
//                     {/*    Organisms*/}
//                     {/*</ListItem>*/}
//                 </ul>
//             </nav>
//         );
//     }
//
// }
//
//
// export default App;