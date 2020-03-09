import React, { useState, useEffect } from 'react';
import { Switch, Route, RouteProps, Link } from 'react-router-dom';
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

interface IProtectedRoute extends RouteProps {
  authService: IAuthService
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({authService, children, ...rest}) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const serviceGetUser = async () => {
      const userResponse = await authService.getUser();
      if (userResponse) {
        toastr.success('User has been successfully loaded from store.');
      } else {
        toastr.info('You are not logged in.');
      }
      setUser(userResponse);
      return userResponse;
    };

    serviceGetUser();
  }, [authService]);

  const login = () => {
    authService.login();
  };

  const logout = () => {
    authService.logout();
  };

  return user != null ?
    <Route {...rest}>
      <Buttons logout={logout} />
      {children}
    </Route> :
    <Buttons
      login={login}
    />
}

const Router: React.FC<IRouter> = (props) => {

  return (
    <Switch>
      <ProtectedRoute exact path='/' authService={props.authService}>
        <div>
          <h1>Home page</h1>
          <Link to="/userdetails">User Details</Link>
        </div>
      </ProtectedRoute>
      <ProtectedRoute exact path='/userdetails' authService={props.authService}>
        <AppContent apiService={props.apiService} authService={props.authService} />
      </ProtectedRoute>
      <Route exact path='/signin-callback' authService={props.authService}>
        <SigninCallback authService={props.authService} />
      </Route>
    </Switch>
  );
}

export default Router;
