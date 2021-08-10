import React from 'react';
import ReactDOM from 'react-dom';

import './assets/style/index.css';

import App from "./App";
// import RobTest from "./components/baker-local/robTest";


ReactDOM.render(
    <React.StrictMode>
        <div id="app-container">
            {/*<RobTest />*/}

            <App  />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
