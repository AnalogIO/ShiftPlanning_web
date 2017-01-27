import React from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from 'routes';
import { Roles } from './types';

interface Props {
  roles: Roles;
}

export default ({ roles }: Props) =>
  <div style={{ width: '210px', flex: '0 0 auto' }}>
    <div
      className="ui vertical inverted menu fixed top"
      style={{
        height: '100%',
      }}
    >
      <div className="item">
        <span
          className="ui image"
          style={{ marginRight: '1em', width: '35px' }}
        >
          <img src={require('shared/images/logo.png')} alt="Logo" />
        </span>
        <b>ShiftPlanning</b>
      </div>
      {routes(roles).map(r =>
        <NavLink
          key={r.name}
          className="item"
          activeClassName="active"
          to={r.path}
        >
          {r.name}
        </NavLink>,
      )}
    </div>
  </div>;
