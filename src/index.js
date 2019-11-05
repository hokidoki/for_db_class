import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { configureStore } from './Store/index';

import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

const history = createBrowserHistory();
const store = configureStore(history);


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

