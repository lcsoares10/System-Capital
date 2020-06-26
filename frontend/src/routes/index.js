//import React, { useContext } from 'react';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthProvider, { useAuthContext } from '../Context/AuthContext';

import Logon from '../pages/Logon';
import InvestorProfile from '../pages/Investor/Profile';

import ViewProfile from '../pages/ViewProfile';
import ListUsers from '../pages/ListUsers';
import Messages from '../pages/Messages';
import RegisterContract from '../pages/RegisterContract';
import RegisterUsers from '../pages/RegisterUsers';
import DetailInvestment from '../pages/Investor/DetailInvestment';
import DetailContract from '../pages/DetailContract';
import NewUser from '../pages/NewUser';
import Page404 from '../pages/Page404';

import ConsultantProfile from '../pages/Consultant/Profile';
import AssociatedInvestors from '../pages/Consultant/AssociatedInvestors';
import DetailInvestor from '../pages/Consultant/DetailInvestor';
import IncomeConsultant from '../pages/Consultant/IncomeConsultant';
import DetailIncome from '../pages/Consultant/DetailIncome';

import Loading from '../components/Loading';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //const { loading, authenticated } = useContext(AuthContext);
  const { loading, authenticated, user } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  //Fazer validação da tela login aqui

  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.match.path !== '/login' && !authenticated) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        } else if (props.match.path === '/login' && authenticated) {
          console.log('aqui');

          switch (user.type) {
            case 'investor':
              return (
                <Redirect
                  to={{
                    pathname: '/InvestorProfile',
                    state: { from: props.location },
                  }}
                />
              );
            case 'consultant':
              return (
                <Redirect
                  to={{
                    pathname: '/ConsultantProfile',
                    state: { from: props.location },
                  }}
                />
              );
          }
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

//<Route path="/*"  component = {Page404} />

export default function Routes() {
  //const [userr,setUserr] = useState({"type":''})

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/Loading" component={Loading} />

          <PrivateRoute path="/login" component={Logon} />
          <PrivateRoute path="/newuser" component={NewUser} />

          <PrivateRoute path="/InvestorProfile" component={InvestorProfile} />
          <PrivateRoute path="/view-profile" component={ViewProfile} />
          <PrivateRoute
            path="/detail-investment/:id"
            component={DetailInvestment}
          />
          <PrivateRoute
            path="/detail-contract/:id"
            component={DetailContract}
          />
          <PrivateRoute path="/listUsers" component={ListUsers} />
          <PrivateRoute path="/messages" component={Messages} />
          <PrivateRoute path="/RegisterContract" component={RegisterContract} />
          <PrivateRoute path="/RegisterUsers" component={RegisterUsers} />

          <PrivateRoute
            path="/ConsultantProfile"
            component={ConsultantProfile}
          />
          <PrivateRoute
            path="/associatedInvestors/:id"
            component={AssociatedInvestors}
          />
          <PrivateRoute
            path="/detailInvestor/:name"
            component={DetailInvestor}
          />
          <PrivateRoute
            path="/incomeConsultant/:id"
            component={IncomeConsultant}
          />
          <PrivateRoute path="/detailIncome/:id" component={DetailIncome} />
          <PrivateRoute path="/*" component={Page404} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}
