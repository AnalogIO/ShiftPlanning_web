import React from 'react';

interface Props {}

export default (props: Props) => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          style={{ display: 'block', width: '150px' }}
          src={require('./images/loading.gif')}
        />
        <p>Loading...</p>
      </div>
    </div>
  );
};
