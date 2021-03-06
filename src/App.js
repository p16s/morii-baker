import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import Nav from "./components/baker-local/nav/nav";
import ThemeDemo from "./components/baker-local/themeDemo/themeDemo";
import PageAtoms from "./pages/atoms";
import PageMolecules from "./pages/molecules";
import PageOrganisms from "./pages/organisms";
import PageTemplates from "./pages/templates";
import Pages from "./pages/page";
import PageMinimal from "./components/pages/minimal/minimal";
import PageLogin from "./components/pages/login/login";
import PageOnboard from "./components/pages/onboard/onboard";


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
                        <Route path="/page/minimal">
                            <PageMinimal />
                        </Route>
                        <Route path="/page/login">
                            <PageLogin />
                        </Route>
                        <Route path="/page/onboard">
                            <PageOnboard />
                        </Route>
                </Switch>
            </Router>
        </>
    );
}


export default App;