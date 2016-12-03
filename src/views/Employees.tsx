import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import * as _ from 'lodash';

const { Link, Match } = require('react-router');

import Employee from 'components/Employee';
import EditEmployeeForm from 'components/EditEmployeeForm';

@inject('stores') @observer
export default class Employees extends Component<any, {}> {
  // declare it as `action` for the implicit transaction
  // this way we can be sure both employees and titles have been fetched
  @action componentDidMount() {
    const { EmployeeStore } = this.props.stores;

    EmployeeStore.getEmployees();
    EmployeeStore.getTitles();
  }

  render() {
    const { EmployeeStore } = this.props.stores;

    if (!EmployeeStore.employees.length) {
      return <h1 className="title">Getting employees...</h1>
    }

    const { pathname } = this.props;

    const employees = EmployeeStore.employees.map((e: any, i: any) => (
      <Link key={i} className="column is-3" to={`${pathname}/${e.id}`}>
        <Employee employee={e} />
      </Link>
    ));

    return (
      <div id="employees">
        <Match pattern={`${pathname}/:id`} render={(props: any) => {
          const titles = EmployeeStore.titles;
          const employee = EmployeeStore.getEmployee(props.params.id);
          if (!employee) { return null; }

          return <EditEmployeeForm onSubmit={(e: any) => EmployeeStore.updateEmployee(e)} employee={employee} titles={titles} />
        }} />

        <h1 className="title">Employees</h1>
        <div className="columns is-multiline">
          {employees}
        </div>
      </div>
    );
  }
}
