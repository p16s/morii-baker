import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import LabelExample from "./atoms/label/example/labelExample";
import InputExample from "./atoms/input/example/inputExample";
import TextareaExample from "./atoms/textarea/example/textareaExample";
import ButtonExample from "./atoms/button/example/buttonExample";
import AlertExample from "./atoms/alert/example/alertExample";
import CheckboxExample from "./atoms/checkbox/example/checkboxExample";

import IconExample from "./atoms/icon/example/iconExample";
import ListHeaderExample from "./atoms/listHeader/example/listHeaderExample";
import ListItemExample from "./atoms/listItem/example/listItemExample";

import IconBarExample from "./molecules/iconBar/example/IconBarExample";
import ListExample from "./molecules/list/example/listExample";

import SideBarExample from "./organisms/SideBar/example/sideBarExample";


ReactDOM.render(
    <React.StrictMode>
        <div>
            <LabelExample />
            <InputExample />
            <TextareaExample />
            <ButtonExample />
            <AlertExample />
            <CheckboxExample />


            {/*<IconExample />*/}
            {/*<IconBarExample />*/}
            {/*<ListHeaderExample />*/}
            {/*<ListItemExample />*/}
            {/*<ListExample />*/}
            {/*<SideBarExample />*/}
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);