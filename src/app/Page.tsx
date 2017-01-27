import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { routes } from 'routes';
import { RootState } from 'shared/types';
import { CurrentUser } from './types';

import AppNav from 'app/AppNav';
import FourOhFour from 'errors/404';
import LoginPage from 'login/Page';
import PrivateRoute from 'shared/PrivateRoute';

interface StateProps {
  currentUser: CurrentUser;
}

interface DispatchProps {}

class App extends Component<StateProps & DispatchProps, {}> {
  render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return <LoginPage />;
    }

    const { roles } = currentUser;

    return (
      <div className="full height">
        <AppNav roles={roles} />

        <div className="article">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/schedules" />} />
            {routes(roles).map(
              r =>
                r.private
                  ? <PrivateRoute
                      key={r.name}
                      path={r.path}
                      component={r.component}
                    />
                  : <Route
                      key={r.name}
                      path={r.path}
                      component={r.component}
                    />,
            )}
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ app }: RootState) => ({
  currentUser: app.currentUser,
});

export default connect(mapStateToProps, undefined, undefined, {
  pure: false,
})(App as any);
