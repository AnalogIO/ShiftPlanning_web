import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'views/App';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
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
