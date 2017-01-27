import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }: any, { store }: any) =>
  <Route
    {...rest}
    render={(props: any) =>
      store.getState().app.currentUser
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />}
  />;

(PrivateRoute as any).contextTypes = {
  store: PropTypes.object.isRequired,
};

export default PrivateRoute;
