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
import Page404 from '../pages/Page404';

import Loading from '../components/Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //const { loading, authenticated } = useContext(AuthContext);
  const { loading, authenticated } = useAuthContext();

  if (loading) {
    return Loading;
  }

  return <Route
    { ...rest }
    render={props => (
      authenticated ? (
        <Component {... props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location }}} />
      )
    )}
  />
}

//<Route path="/*"  component = {Page404} />

export default function Routes() {
    return(

        <BrowserRouter>
          <Switch>
            <Route path="/" exact component = {Logon} />
            <Route path="/Loading"  component = {Loading} />

            <PrivateRoute path="/profile" component = {Profile} />
            <PrivateRoute path="/view-profile" component = {ViewProfile} />
            <PrivateRoute path="/detail-investment/:id" component = {DetailInvestment} />
            <PrivateRoute path="/detail-contract/:id" component = {DetailContract} />
            <PrivateRoute path="/listUsers" component = {ListUsers} />
            <PrivateRoute path="/messages" component = {Messages} />
            <PrivateRoute path="/RegisterContract" component = {RegisterContract} />
            <PrivateRoute path="/RegisterUsers" component = {RegisterUsers} />
            <PrivateRoute path="/*" component = {Page404} />

          </Switch>
        </BrowserRouter>

    );
}

