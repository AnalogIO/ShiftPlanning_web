import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';

import { actions } from 'app';

interface Props {
  logout: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logout() {
    dispatch(actions.logout());
  },
});

class Logout extends Component<Props, {}> {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect(state => ({}), mapDispatchToProps)(Logout);
