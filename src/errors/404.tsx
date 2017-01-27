import React from 'react';

export default () =>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
  >
    <img
      className="ui image"
      src={require('shared/images/404.gif')}
      alt="404 coffee not found"
    />
  </div>;
