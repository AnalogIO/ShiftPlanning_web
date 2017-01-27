// This is necessary because `hot` is usually not defined on `module`
declare var module: any;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import registerServiceWorker from 'registerServiceWorker';
import { history, store } from 'store';

import AppPage from 'app/Page';

store.dispatch({ type: '@@APP_INIT' });

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppPage />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
};

render();
registerServiceWorker();

if (module.hot) {
  module.hot.accept('app/Page', render);

  module.hot.accept('duck', () => {
    const nextRootReducer = require('duck').default;
    store.replaceReducer(nextRootReducer);
  });
}
