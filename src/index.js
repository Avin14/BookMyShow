import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
//import Controller from './screens/Controller';
import { Provider } from 'react-redux';
import BookMyShow from './screens/BookMyShow';
import store from './auth/authStore';

ReactDOM.render(
    <Provider store={store}>
        <BookMyShow />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
