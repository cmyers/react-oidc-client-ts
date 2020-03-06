import React from 'react';
import { Switch, Route} from 'react-router-dom';
import SigninCallback from '../containers/SigninCallback';
import { IAuthService } from '../services/AuthService';
import AppContent from '../components/AppContent';
import { IApiService } from '../services/ApiService';

interface IRouter {
    authService: IAuthService;
    apiService: IApiService;
  }

const Router: React.FC<IRouter> = (props) => {

  return (
    <Switch>
        <Route exact path='/' component={() => <AppContent apiService={props.apiService} authService={props.authService} />} />
        <Route exact path='/signin-callback' component={() => <SigninCallback authService={props.authService} />} />
    </Switch>
  );
}

export default Router;