import axios from 'axios';
import { Constants } from '../helpers/Constants';
import { IAuthService } from './AuthService';

export interface IApiService {
  callApi(): Promise<any>;
}

export default class ApiService implements IApiService {
  private _authService: IAuthService;

  constructor(authService: IAuthService) {
    this._authService = authService;
  }

  public callApi(): Promise<any> {
    return this._authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._callApi(user.access_token).catch(error => {
          if (error.response.status === 401) {
            return this._authService.renewToken().then(renewedUser => {
              return this._callApi(renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return this._authService.renewToken().then(renewedUser => {
          return this._callApi(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  private _callApi(token: string) {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    };

    return axios.get(Constants.apiRoot + 'test', { headers });
  }
}
