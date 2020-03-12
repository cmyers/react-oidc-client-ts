import * as React from 'react';
import Header from '../components/Header';
import logo from '../logo.svg';
import './App.css';
import ApiService, {IApiService} from '../services/ApiService';
import AuthService, {IAuthService} from '../services/AuthService';
import Router from './Router';

const authService: IAuthService = new AuthService();
const apiService: IApiService = new ApiService(authService);

const App: React.FC = () => {
    return (
      <div className="App">
        <Header pageTitle="Welcome to React and oidc-client-js" logoSrc={logo} />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Router authService={authService} apiService={apiService} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default App;
