import { Log, User, UserManager } from 'oidc-client';
import { Constants } from '../helpers/Constants';

export interface IAuthService {
  getUser(): Promise<User | null>;
  login(): Promise<void>;
  logout(): Promise<void>;
  renewToken(): Promise<User>;
}

export default class AuthService implements IAuthService {
  private _userManager: UserManager;

  constructor() {
    console.log("New Auth Service");
    const settings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback.html`,
      silent_redirect_uri: `${Constants.clientRoot}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${Constants.clientRoot}`,
      response_type: 'code',
      scope: Constants.clientScope
    };
    this._userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this._userManager.getUser();
  }

  public login(): Promise<void> {
    return this._userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this._userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this._userManager.signoutRedirect();
  }
}
