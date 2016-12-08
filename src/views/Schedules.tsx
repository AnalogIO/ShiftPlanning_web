import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import * as _ from 'lodash';

const { Link, Match } = require('react-router');

@inject('stores') @observer
export default class Schedules extends Component<any, {}> {
  componentDidMount() {
    const { ScheduleStore } = this.props.stores;

    ScheduleStore.getSchedules();
  }

  render() {
    const { ScheduleStore } = this.props.stores;

    const schedules = ScheduleStore.schedules.map((s: any) => (
      <tr key={s.id}>
        <td>{s.name}</td>
        <td>{s.numberOfWeeks}</td>
        <td>{s.scheduledShifts.length}</td>
      </tr>
    ));

    return (
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
    );
  }
}
