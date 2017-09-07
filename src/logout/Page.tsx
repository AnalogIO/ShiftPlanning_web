import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { thunks } from 'app';

interface Props {
  logout: () => void;
}

class Logout extends Component<Props, {}> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <div />;
  }
}

// Short hand notation will not type check
const mapDispatchToProps = (dispatch: Dispatch<any>): Props => ({
  logout: () => dispatch(thunks.logout()),
});

export default connect(undefined, mapDispatchToProps)(Logout);
