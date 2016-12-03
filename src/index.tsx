import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';

const Router = require('react-router').BrowserRouter;

import App from 'views/App';
import stores from 'stores';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <Provider stores={stores}>
          <App />
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById('app')
  );
}

render();

// This is necessary because `hot` is usually not defined on `module`
declare var module: any;

if (module.hot) {
  module.hot.accept('views/App', render);
}
