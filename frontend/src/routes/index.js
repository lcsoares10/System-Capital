
import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom' ;

import Logon from '../pages/Logon';
import Profile from '../pages/Profile';
import ListUsers from '../pages/ListUsers';
import Messages from '../pages/Messages';
import RegisterContract from '../pages/RegisterContract';
import RegisterUsers from '../pages/RegisterUsers';



export default function Routes() {
    return(

        <BrowserRouter>
        
            <Switch>
                <Route path="/" exact component = {Logon} />
                <Route path="/profile" component = {Profile} />
                <Route path="/listUsers" component = {ListUsers} />
                <Route path="/messages" component = {Messages} />
                <Route path="/RegisterContract" component = {RegisterContract} />
                <Route path="/RegisterUsers" component = {RegisterUsers} />

            </Switch>
        </BrowserRouter>
        
    );
}