import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Employee from 'components/Employee';

@inject('stores') @observer
export default class Employees extends Component<any, {}> {
  componentDidMount() {
    const { EmployeeStore } = this.props.stores;

    if (!EmployeeStore.employees.length) {
      EmployeeStore.getEmployees();
    }
  }

  render() {
    const { EmployeeStore } = this.props.stores;

    if (!EmployeeStore.employees.length) {
      return <h1 className="title">Getting employees...</h1>
    }

    const employees = EmployeeStore.employees.map((e, i) => {
      return <div key={i} className="column is-3"><Employee employee={e} /></div>
    });

    return (
      <div id="employees">
        <h1 className="title">Employees</h1>
        <div className="columns is-multiline">
          {employees}
        </div>
      </div>
    );
  }
}
