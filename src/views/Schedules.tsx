import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import * as _ from 'lodash';

import { Shift } from '../stores';

const { Link, Match } = require('react-router');

import Schedule from 'components/Schedule';
import AddShift from 'components/AddShift';

@inject('stores') @observer
export default class Schedules extends Component<any, {}> {
  componentDidMount() {
    const { ScheduleStore, EmployeeStore } = this.props.stores;

    ScheduleStore.getSchedules();
    EmployeeStore.getEmployees();
  }

  render() {
    const { pathname } = this.props;
    const { ScheduleStore, EmployeeStore } = this.props.stores;

    const schedules = ScheduleStore.schedules.map((s: any) => (
      <tr key={s.id}>
        <td><Link to={`${pathname}/${s.id}`}>{s.name}</Link></td>
        <td>{s.numberOfWeeks}</td>
        <td>{s.scheduledShifts.length}</td>
      </tr>
    ));

    if (!schedules.length) {
      return <h1 className="title">Getting schedules...</h1>
    }

    return (
      <div>
        <Match pattern={`${pathname}/:id`} render={(props: any) => (
          <Schedule route={props} schedule={ScheduleStore.getById(props.params.id)} />
        )} />

        <Match pattern={`${pathname}/:id/:week/:day`} render={(props: any) => {
          const shift = {} as Shift;
          const id = props.params.id;
          return <AddShift handleNewShift={(s: Shift) => ScheduleStore.newShift(id, s)} route={props} newShift={shift} employees={EmployeeStore.employees} />
        }} />

        <div>
          <h1 className="title">Schedules</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Weeks</th>
                <th>Scheduled shifts</th>
              </tr>
            </thead>
            <tbody>
              {schedules}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
