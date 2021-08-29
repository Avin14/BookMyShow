import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
//import Controller from './screens/Controller';
import Home from './screens/Home/Home'
import { Provider } from 'react-redux';
import store from './auth/authStore';

ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
