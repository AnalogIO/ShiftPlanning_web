import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

const { Link, Match } = require('react-router');

import LoginContainer from 'containers/Login';
import NavLink from 'components/NavLink';

@inject('stores') @observer
export default class App extends Component<any, {}> {
  render() {
    const { AuthStore } = this.props.stores;

    return (
      AuthStore.isAuthenticated ? (
        <div>
          <nav className="nav has-shadow">
            <div className="nav-left">
              <Link className="nav-item is-brand title" to="/">ShiftPlanning</Link>
            </div>

            <div className="nav-center">
              <NavLink to="/shifts">Shifts</NavLink>
              <NavLink to="/schedules">Schedules</NavLink>
              <NavLink to="/employees">Employees</NavLink>
              <NavLink to="/organization">Organization</NavLink>
            </div>

            <div className="nav-right"></div>
          </nav>

          <section className="section">
            <div className="container">
            </div>
          </section>
        </div>
      ) : (
        <LoginContainer />
      )
    );
  }
}
