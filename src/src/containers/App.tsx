import * as React from 'react';
import AppContent from '../components/AppContent';
import Header from '../components/Header';
import logo from '../logo.svg';
import './App.css';
import { ApiService } from '../services/ApiService';
import AuthService from '../services/AuthService';

const authService = new AuthService();
const apiService = new ApiService();

const App: React.FC = () => {
    return (
      <div className="App">
        <Header pageTitle="Welcome to React and oidc-client-js" logoSrc={logo} />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <AppContent authService={authService} apiService={apiService}/>
            </div>
          </div>
        </div>
      </div>
    );
};

export default App;
