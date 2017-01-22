import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import * as _ from 'lodash';

const { Link, Match } = require('react-router');

import Employee from 'components/Employee';
import EditEmployeeForm from 'components/EditEmployeeForm';
import NewEmployeeForm from 'components/NewEmployeeForm';

import { IEmployee } from 'stores';

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
    const { pathname } = this.props;
    const { EmployeeStore } = this.props.stores;

    const newEmployeeLink = (
      <Link
        to={`${pathname}/new`}
        className="icon"
        style={{verticalAlign: 'middle', color: '#363636'}}
      >
        <i className="fa fa-plus"></i>
      </Link>
    );

    if (!EmployeeStore.employees.length) {
      return <h1 className="title">Getting employees...</h1>
    }

    const employees = EmployeeStore.employees.map((e: IEmployee, i: number) => (
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

          return (
            <EditEmployeeForm
              onSubmit={(e: IEmployee) => EmployeeStore.updateEmployee(e)}
              onDelete={(e: IEmployee) => EmployeeStore.deleteEmployee(e)}
              employee={employee}
              titles={titles}
            />
          );
        }} />

        <Match pattern={`${pathname}/new`} render={(props: any) => {
          const titles = EmployeeStore.titles;

          const employee = {} as IEmployee;

          return (
            <NewEmployeeForm
              onSubmit={(e: IEmployee) => EmployeeStore.createEmployee(e)}
              newEmployee={employee}
              titles={titles}
            />
          );
        }} />

        <h1 className="title">Employees {newEmployeeLink}</h1>
        <div className="columns is-multiline">
          {employees}
        </div>
      </div>
    );
  }
}
