import React, {useState, useEffect, useCallback } from 'react';
import * as toastr from 'toastr';
import { ApiService } from '../services/ApiService';
import AuthService from '../services/AuthService';
import AuthContent from './AuthContent';
import Buttons from './Buttons';
import { User } from 'oidc-client';

interface IAppContent {
  authService: AuthService;
  apiService: ApiService;
}

const AppContent: React.FC<IAppContent> = (props) => {

  const [user, setUser] = useState<User | null>();
  const [api, setApi] = useState();
  
  const serviceGetUser = useCallback(async () => {
    const userResponse = await props.authService.getUser();
      if (userResponse) {
        toastr.success('User has been successfully loaded from store.');
      } else {
        toastr.info('You are not logged in.');
      }

      setUser(userResponse);
      return userResponse;
  }, [props.authService]);

  useEffect(() => {
    serviceGetUser();
  }, [serviceGetUser]);

  const callApi = () => {
    props.apiService
      .callApi()
      .then(data => {
        setApi(data.data);
        toastr.success('Api return successfully data, check in section - Api response');
      })
      .catch(error => {
        toastr.error(error);
      });
  };

  const renewToken = () => {
    props.authService
      .renewToken()
      .then(user => {
        toastr.success('Token has been sucessfully renewed. :-)');
        serviceGetUser();
      })
      .catch(error => {
        toastr.error(error);
      });
  };

  const login = () => {
    props.authService.login();
  };

  const logout = () => {
    props.authService.logout();
  };

  return (
    <>
      <Buttons
        login={login}
        logout={logout}
        renewToken={renewToken}
        getUser={serviceGetUser}
        callApi={callApi}
      />

      <AuthContent api={api} user={user} />
    </>
  );
}

export default AppContent;
