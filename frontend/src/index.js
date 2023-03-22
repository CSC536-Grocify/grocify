import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./pages/login/components/Navbar/navbar.scss"
import "./pages/login/components/Home/home.scss"
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
