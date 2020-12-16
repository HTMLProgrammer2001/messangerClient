import React from 'react';
import ReactDOM from 'react-dom';

import 'react-toastify/scss/main.scss';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

import './styles/generalStyles.scss';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
