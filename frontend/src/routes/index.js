
import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom' ;

import Logon from '../pages/Logon';
import Profile from '../pages/Profile';
import ViewProfile from '../pages/ViewProfile';
import ListUsers from '../pages/ListUsers';
import Messages from '../pages/Messages';
import RegisterContract from '../pages/RegisterContract';
import RegisterUsers from '../pages/RegisterUsers';
import DetailInvestment from '../pages/DetailInvestment';
import DetailContract from '../pages/DetailContract';



export default function Routes() {
    return(

        <BrowserRouter>
        
            <Switch>
                <Route path="/logon" exact component = {Logon} />
                <Route path="/profile" component = {Profile} />
                <Route path="/view-profile" component = {ViewProfile} />
                <Route path="/detail-investment" component = {DetailInvestment} />
                <Route path="/detail-contract" component = {DetailContract} />
                <Route path="/listUsers" component = {ListUsers} />
                <Route path="/messages" component = {Messages} />
                <Route path="/RegisterContract" component = {RegisterContract} />
                <Route path="/RegisterUsers" component = {RegisterUsers} />

            </Switch>
        </BrowserRouter>
        
    );
}