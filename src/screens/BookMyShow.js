import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Fragment } from 'react';
import Home from './Home/Home';
import { useDispatch } from 'react-redux';

export default function BookMyShow(){

    return(
        <Fragment>
            <Router>
                <Route exact path="/" render={(props) => <Home {...props}/>} />
                {/* <Route exact path="/Details" render={({history},props) => <AddSubscriber {...props} />} /> */}
            </Router>
        </Fragment>
    );               

}
