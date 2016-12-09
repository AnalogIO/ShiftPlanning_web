import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import * as _ from 'lodash';

const { Link, Match } = require('react-router');

import Schedule from 'components/Schedule';

@inject('stores') @observer
export default class Schedules extends Component<any, {}> {
  componentDidMount() {
    const { ScheduleStore } = this.props.stores;

    ScheduleStore.getSchedules();
  }

  render() {
    const { pathname } = this.props;
    const { ScheduleStore } = this.props.stores;

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
