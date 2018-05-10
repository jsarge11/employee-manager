import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MuiThemeProvider>
        <Main />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);