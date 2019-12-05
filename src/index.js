import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './style/style.css'
import { configureStore } from './Store/index';

import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBFqFWXNecwYdzVugabCOgWxMmh9uzDezs",
    authDomain: "oauth-project-d0540.firebaseapp.com",
    databaseURL: "https://oauth-project-d0540.firebaseio.com",
    projectId: "oauth-project-d0540",
    storageBucket: "oauth-project-d0540.appspot.com",
    messagingSenderId: "451956853387",
    appId: "1:451956853387:web:c68c7bdc3e448bdd"
}

firebase.initializeApp(config);

const history = createBrowserHistory();
const store = configureStore(history);


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

