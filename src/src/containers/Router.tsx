import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import SigninCallback from '../containers/SigninCallback';
import { IAuthService } from '../services/AuthService';
import AppContent from '../components/AppContent';
import { IApiService } from '../services/ApiService';
import { User } from 'oidc-client';
import * as toastr from 'toastr';
import Buttons from '../components/Buttons';

interface IRouter {
  authService: IAuthService;
  apiService: IApiService;
}

interface IProtectedRoute {
  authService: IAuthService;
}

const Router: React.FC<IRouter> = (props) => {

  return (
    <Switch>
      <Route exact path='/'>
        <ProtectedRoute authService={props.authService}>
          <AppContent apiService={props.apiService} authService={props.authService} />
        </ProtectedRoute>
      </Route>
      <Route exact path='/signin-callback' component={() => <SigninCallback authService={props.authService} />} />
    </Switch>
  );
}

const ProtectedRoute: React.FC<IProtectedRoute> = props => {

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const serviceGetUser = async () => {
      const userResponse = await props.authService.getUser();
      if (userResponse) {
        toastr.success('User has been successfully loaded from store.');
      } else {
        toastr.info('You are not logged in.');
      }
      setUser(userResponse);
      return userResponse;
    };

    serviceGetUser();
  }, [props.authService]);

  const login = () => {
    props.authService.login();
  };

  return user != null ?
    <>
      {props.children}</> :
    <Buttons
      login={login}
    />
}

export default Router;
