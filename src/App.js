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
import Pages from "./pages/page";

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

                    <Route path="/pages">
                        <Pages />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}


export default App;