import React, {useState, useCallback } from 'react';
import * as toastr from 'toastr';
import { IApiService } from '../services/ApiService';
import { IAuthService } from '../services/AuthService';
import AuthContent from './AuthContent';
import Buttons from './Buttons';
import { User } from 'oidc-client';

interface IAppContent {
  authService: IAuthService;
  apiService: IApiService;
}

const AppContent: React.FC<IAppContent> = (props) => {

  const [user, setUser] = useState<User | null>();
  const [api, setApi] = useState();
  
  const serviceGetUser = useCallback(async () => {
    const userResponse = await props.authService.getUser();
      if (userResponse) {
        toastr.success('User has been loaded from store.');
      } else {
        toastr.info('You are not logged in.');
      }

      setUser(userResponse);
      return userResponse;
  }, [props.authService]);

  const callApi = () => {
    props.apiService
      .callApi()
      .then(data => {
        setApi(data.data);
        toastr.success('Api returned data.');
      })
      .catch(error => {
        toastr.error(error);
      });
  };

  const renewToken = () => {
    props.authService
      .renewToken()
      .then(user => {
        toastr.success('Token has been renewed.');
        serviceGetUser();
      })
      .catch(error => {
        toastr.error(error);
      });
  };

  return (
    <>
      <Buttons
        renewToken={renewToken}
        getUser={serviceGetUser}
        callApi={callApi}
      />
      <AuthContent api={api} user={user} />
    </>
  );
}

export default AppContent;
