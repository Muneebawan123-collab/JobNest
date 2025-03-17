import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { setAuthToken } from './utils/auth';
import { store } from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

store.dispatch(initializeAuth());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);