//import React, { useContext } from 'react';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom' ;

import { useAuthContext } from '../Context/AuthContext';

import Logon from '../pages/Logon';
import Profile from '../pages/Profile';
import ViewProfile from '../pages/ViewProfile';
import ListUsers from '../pages/ListUsers';
import Messages from '../pages/Messages';
import RegisterContract from '../pages/RegisterContract';
import RegisterUsers from '../pages/RegisterUsers';
import DetailInvestment from '../pages/DetailInvestment';
import DetailContract from '../pages/DetailContract';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //const { loading, authenticated } = useContext(AuthContext);
  const { loading, authenticated } = useAuthContext();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <Route
    { ...rest }
    render={props => (
      authenticated ? (
        <Component {... props} />
      ) : (
        <Redirect to={{ pathname: '/logon', state: { from: props.location }}} />
      )
    )}
  />
}

export default function Routes() {
    return(

        <BrowserRouter>
          <Switch>
            <Route path="/logon" exact component = {Logon} />
            <PrivateRoute path="/profile" component = {Profile} />
            <PrivateRoute path="/view-profile" component = {ViewProfile} />
            <PrivateRoute path="/detail-investment" component = {DetailInvestment} />
            <PrivateRoute path="/detail-contract" component = {DetailContract} />
            <PrivateRoute path="/listUsers" component = {ListUsers} />
            <PrivateRoute path="/messages" component = {Messages} />
            <PrivateRoute path="/RegisterContract" component = {RegisterContract} />
            <PrivateRoute path="/RegisterUsers" component = {RegisterUsers} />

          </Switch>
        </BrowserRouter>

    );
}

