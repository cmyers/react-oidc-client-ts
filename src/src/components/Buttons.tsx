import * as React from 'react';

interface IButtonsProps {
  login?: () => void;
  getUser?: () => void;
  callApi?: () => void;
  renewToken?: () => void;
  logout?: () => void;
}

const Buttons: React.FC<IButtonsProps> = (props) => {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
        {props.login !== undefined ? 
          <button className="btn btn-primary btn-login" style={{ margin: '10px' }} onClick={props.login}>
            Login
          </button> : undefined
        }
        {props.getUser !== undefined ?
          <button className="btn btn-secondary btn-getuser" style={{ margin: '10px' }} onClick={props.getUser}>
            Get User info
          </button> : null
        }
        {props.callApi !== undefined ?
          <button className="btn btn-warning btn-getapi" style={{ margin: '10px' }} onClick={props.callApi}>
            Call API
          </button> : null
        }
        {props.renewToken !== undefined ?
          <button className="btn btn-success btn-renewtoken" style={{ margin: '10px' }} onClick={props.renewToken}>
            Renew Token
          </button> : null
        }
        {props.logout !== undefined ?
          <button className="btn btn-dark btn-logout" style={{ margin: '10px' }} onClick={props.logout}>
            Logout
          </button> : null
        }
      </div>
    </div>
  );
};

export default Buttons;
