import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import RobTest from "./robTest";

import LabelExample from "./atoms/label/example/labelExample";
import InputExample from "./atoms/input/example/inputExample";
import PinExample from "./atoms/pin/example/pinExample";
import TextareaExample from "./atoms/textarea/example/textareaExample";
import ButtonExample from "./atoms/button/example/buttonExample";
import AlertExample from "./atoms/alert/example/alertExample";
import CheckboxExample from "./atoms/checkbox/example/checkboxExample";
import ToggleExample from "./atoms/toggle/example/toggleExample";
import TabExample from "./atoms/tab/example/tabExample";

import ListHeaderExample from "./atoms/listHeader/example/listHeaderExample";
import ListItemExample from "./atoms/listItem/example/listItemExample";
// import IconExample from "./atoms/icon/example/iconExample";

// import IconBarExample from "./molecules/iconBar/example/IconBarExample";
// import ListExample from "./molecules/list/example/listExample";

// import SideBarExample from "./organisms/SideBar/example/sideBarExample";


ReactDOM.render(
    <React.StrictMode>
        <div>
            <RobTest />

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


            {/*<IconExample />*/}
            {/*<IconBarExample />*/}
            {/*<ListExample />*/}
            {/*<SideBarExample />*/}
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);