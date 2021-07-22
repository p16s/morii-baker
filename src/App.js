import React from "react";

import LabelExample from "./atoms/label/example/labelExample";
import InputExample from "./atoms/input/example/inputExample";
import PinExample from "./atoms/pin/example/pinExample";
import TextareaExample from "./atoms/textarea/example/textareaExample";
import ButtonExample from "./atoms/button/example/buttonExample";
import AlertExample from "./atoms/alert/example/alertExample";
import CheckboxExample from "./atoms/checkbox/example/checkboxExample";
import ToggleExample from "./atoms/toggle/example/toggleExample";
import TabExample from "./atoms/tab/example/tabExample";
import ListItem from "./atoms/listItem/listItem";
// import ListHeaderExample from "./atoms/listHeader/example/listHeaderExample";
import ListItemExample from "./atoms/listItem/example/listItemExample";
import IconExample from "./atoms/icon/example/iconExample";

import InputsExample from "./molecules/Inputs/example/inputsExample";
import TextareasExample from "./molecules/textareas/example/textareasExample";
// import IconBarExample from "./molecules/iconBar/example/IconBarExample";
// import ListExample from "./molecules/list/example/listExample";

import SideBarExample from "./organisms/SideBar/example/sideBarExample";




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
        if (this.state.isShowing === 'atoms') {
            return (
                <>
                    {this.render_nav()}

                    <LabelExample />
                    <InputExample />
                    <PinExample />
                    <TextareaExample />
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

                    <InputsExample />
                    <TextareasExample />

                    {/*<IconBarExample />*/}
                    {/*<ListExample />*/}
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