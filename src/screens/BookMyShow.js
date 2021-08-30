import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Fragment } from 'react';
import Home from './Home/Home';
import Detail from './Details/Detail';
import BookShow from './bookshow/BookShow';


export default function BookMyShow(){

    return(
        <Fragment>
            <Router>
                <Route exact path="/" render={(props) => <Home {...props}/>} />
                <Route exact path="/detail" render={({history},props) => <Detail {...props} />} /> 
                <Route exact path="/bookshow" render={({history},props) => <BookShow {...props} />} /> 
            </Router>
        </Fragment>
    );               

}
