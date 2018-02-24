// This is necessary because `hot` is usually not defined on `module`
declare var module: any;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from 'store';

import AppPage from 'app/Page';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppPage />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
};

render();

if (module.hot) {
  module.hot.accept('app/Page', render);

  module.hot.accept('duck', () => {
    const nextRootReducer = require('duck').default;
    store.replaceReducer(nextRootReducer);
  });
}
