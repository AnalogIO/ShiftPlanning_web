import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Employees extends Component<any, {}> {
  render() {
    const { employee } = this.props;

    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={employee.photoRef} alt="" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content" style={{ maxWidth: '100%' }}>
              <p
                className="title is-4"
                title={`${employee.firstName} ${employee.lastName}`}
                style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  lineHeight: 'normal',
                }}
              >
                {`${employee.firstName} ${employee.lastName}`}
              </p>
              <p className="subtitle is-6">{employee.employeeTitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
