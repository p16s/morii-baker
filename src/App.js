import React from "react";

import ThemeDemo from "./components/themeDemo/themeDemo";

import LabelExample from "./components/atoms/label/example/labelExample";
import FormInputExample from "./components/atoms/formInput/example/formInputExample";
import FormPinExample from "./components/atoms/formPin/example/formPinExample";
import FormTextareaExample from "./components/atoms/formTextarea/example/formTextareaExample";
import ButtonExample from "./components/atoms/button/example/buttonExample";
import AlertExample from "./components/atoms/alert/example/alertExample";
import CheckboxExample from "./components/atoms/checkbox/example/checkboxExample";
import ToggleExample from "./components/atoms/toggle/example/toggleExample";
import TabExample from "./components/atoms/tab/example/tabExample";
import ListItem from "./components/atoms/listItem/listItem";
// import ListHeaderExample from "./components/atoms/listHeader/example/listHeaderExample";
import ListItemExample from "./components/atoms/listItem/example/listItemExample";
import IconExample from "./components/atoms/icon/example/iconExample";

import InputExample from "./components/molecules/input/example/inputExample";
import TextareaExample from "./components/molecules/textarea/example/textareaExample";
import PinExample from "./components/molecules/pin/example/pinExample";
import ListExample from "./components/molecules/list/example/listExample";
import IconBarExample from "./components/molecules/iconBar/example/IconBarExample";
import TitleBarExample from "./components/molecules/titleBar/example/titleBarExample";

import SideBarExample from "./components/organisms/SideBar/example/sideBarExample";




class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowing: 'molecules'
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Render
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Conditional render depending on the state
     *
     * @return {*}
     */
    render(props) {
        if (this.state.isShowing === 'theme') {
            return (
                <>
                    {this.render_nav()}

                    <ThemeDemo />
                </>
            );
        }


        if (this.state.isShowing === 'atoms') {
            return (
                <>
                    {this.render_nav()}

                    <LabelExample />
                    <FormInputExample />
                    <FormPinExample />
                    <FormTextareaExample />
                    <ButtonExample />
                    <AlertExample />
                    <CheckboxExample />
                    <ToggleExample />
                    <TabExample />
                    {/*<ListHeaderExample />*/}
                    <ListItemExample />
                    <IconExample />
                </>
            );
        }


        if (this.state.isShowing === 'molecules') {
            return (
                <>
                    {this.render_nav()}

                    <InputExample />
                    <TextareaExample />
                    <PinExample />
                    <ListExample />
                    <TitleBarExample />

                    <IconBarExample />
                </>
            );
        }


        if (this.state.isShowing === 'organisms') {
            return (
                <>
                    {this.render_nav()}

                    <SideBarExample />
                </>
            );
        }
    }


    /**
     * Render a nav to toggle the state
     *
     * @return {*}
     */
    render_nav() {
        return (
            <nav>
                <ul className={'site-nav'}>
                    <ListItem
                        active={(this.state.isShowing === 'theme')}
                        onClick={() => this.handleClick('theme')}
                    >
                        Theme
                    </ListItem>
                    <ListItem
                        active={(this.state.isShowing === 'atoms')}
                        onClick={() => this.handleClick('atoms')}
                    >
                        Atoms
                    </ListItem>
                    <ListItem
                        active={(this.state.isShowing === 'molecules')}
                        onClick={() => this.handleClick('molecules')}
                    >
                        Molecules
                    </ListItem>
                    <ListItem
                        active={(this.state.isShowing === 'organisms')}
                        onClick={() => this.handleClick('organisms')}
                    >
                        Organisms
                    </ListItem>
                </ul>
            </nav>
        );
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Handle click
     *
     * @param {MouseEvent} e
     */
    handleClick(changeTo) {
        this.setState({
            isShowing: this.state.isShowing = changeTo
        });

        window.scrollTo(0, 0);
    }
}


export default App;