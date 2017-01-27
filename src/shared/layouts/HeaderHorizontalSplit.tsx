import React from 'react';

import Header from './Header';

interface Props {
  headerText: string;
  sidebarComponent: any;
  contentComponent: any;
  isLoading: boolean;
}

export default (props: Props) => {
  return (
    <Header
      headerText={props.headerText}
      isLoading={props.isLoading}
      contentComponent={
        <div className="ui grid">
          <div className="three wide column" style={{ paddingRight: 0 }}>
            {props.sidebarComponent}
          </div>
          <div className="thirteen wide column" style={{ paddingLeft: 0 }}>
            <div className="ui container">
              {props.contentComponent}
            </div>
          </div>
        </div>
      }
    />
  );
};
