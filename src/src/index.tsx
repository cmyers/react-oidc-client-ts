import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';

import 'react-app-polyfill/ie11';
import 'core-js';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root') as HTMLElement);
    
registerServiceWorker();
