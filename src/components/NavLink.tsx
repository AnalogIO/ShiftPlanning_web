import React from 'react';

const { Link } = require('react-router');

export default (props: any) =>
  <Link {...props} className="nav-item is-tab" activeClassName="is-active" />
