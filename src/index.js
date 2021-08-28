import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
//import Controller from './screens/Controller';
import Header from './common/Header/Header'
import { Provider } from 'react-redux';
import store from './auth/authStore';

ReactDOM.render(
    <Provider store={store}>
        <Header />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
