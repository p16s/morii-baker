import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from "./App";
import RobTest from "./robTest";


ReactDOM.render(
    <React.StrictMode>
        <div>
            {/*<RobTest />*/}

            <App  />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);