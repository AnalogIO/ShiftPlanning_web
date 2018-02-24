import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Location, redirect } from 'redux-first-router';

import routes from 'routes';
import { routes as appRoutes } from 'app';
import { routes as routesSchedules } from 'schedules';
import { RootState } from 'shared/types';
import { CurrentUser } from './types';

import AppNav from 'app/AppNav';
import FourOhFour from 'errors/404';
import LoginPage from 'login/Page';

interface StateProps {
  currentUser: CurrentUser;
  location: Location;
}

interface DispatchProps {
  redirectTo: (path: string) => void;
}

class App extends React.Component<StateProps & DispatchProps, {}> {
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.redirectTo(appRoutes.login.type);

      return;
    }

    if (location.pathname === '/') {
      this.props.redirectTo(routesSchedules.create.type);

      return;
    }
  }

  render() {
    const { currentUser, location } = this.props;

    if (!currentUser) {
      return <LoginPage />;
    }

    const { roles } = currentUser;

    const match = routes(roles).find(
      r => r.paths.indexOf(location.type) !== -1,
    );

    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <AppNav roles={roles} />

        <div style={{ flex: '1 1 auto' }}>
          {match ? <match.Component /> : <FourOhFour />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ app, location }: RootState) => ({
  currentUser: app.currentUser,
  location,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  redirectTo(actionType: string) {
    const action = redirect({ type: actionType } as any);

    return dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
  pure: false,
})(App as any);
