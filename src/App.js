import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import './config/ReactotronConfig';

import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './global/styleGlobal.scss';
import validators from './common/validators';
import Routes from './routes';
import { Provider } from 'react-redux';
import history from './services/history';
import { store, persistor } from './store';



validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>        
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <Routes />
            </Router>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}
