import React from 'react';

import Loading from 'shared/Loading';

interface Props {
  headerText: string;
  contentComponent: any;
  isLoading: boolean;
  className?: string;
}

const Header = (props: Props) =>
  props.isLoading
    ? <Loading />
    : <div>
        <div
          className="header"
          style={{
            padding: '15px',
            boxShadow: 'rgba(0,0,0,.87) 0 -1px 3px',
          }}
        >
          <span className="ui header">
            {props.headerText}
          </span>
        </div>

        <div className={props.className}>
          {props.contentComponent}
        </div>
      </div>;

export default Header;
