import * as React from 'react';
import {IAuthService} from '../services/AuthService';
import { useHistory } from 'react-router-dom';

interface ISignin {
    authService: IAuthService;
}

const SigninCallback: React.FC<ISignin> = (props) => {
    const history = useHistory();

    React.useEffect(() => {
        (async () => { 
            try {
                await props.authService.signinCallback();
            }
            catch(e) {
                console.error(e);
            }
            finally {
                history.push('/');
            }
        })();
    });

    return <h1>Signing in...</h1>;
};

export default SigninCallback;
