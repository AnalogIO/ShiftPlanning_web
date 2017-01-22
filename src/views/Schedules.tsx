import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import * as _ from 'lodash';

import { IShift, ISchedule } from '../stores';

const { Link, Match } = require('react-router');

import Schedule from 'components/Schedule';
import AddShift from 'components/AddShift';
import UpdateShift from 'components/UpdateShift';
import NewScheduleForm from 'components/NewScheduleForm';

@inject('stores') @observer
export default class Schedules extends Component<any, {}> {
  componentDidMount() {
    const { ScheduleStore, EmployeeStore } = this.props.stores;

    ScheduleStore.getSchedules();
    EmployeeStore.getEmployees();
  }

  handleDelete = (s: ISchedule) => {
    const { ScheduleStore } = this.props.stores;

    if (!confirm('Are you sure?')) {
      return;
    }

    ScheduleStore.deleteSchedule(s);
  }

  render() {
    const { pathname } = this.props;
    const { ScheduleStore, EmployeeStore } = this.props.stores;

    const newScheduleLink = (
      <Link
        to={`${pathname}/new`}
        className="icon"
        style={{verticalAlign: 'middle', color: '#363636'}}
      >
        <i className="fa fa-plus"></i>
      </Link>
    );

    const schedules = ScheduleStore.schedules.map((s: any) => (
      <tr key={s.id}>
        <td><Link to={`${pathname}/${s.id}`}>{s.name}</Link></td>
        <td>{s.numberOfWeeks}</td>
        <td>{s.scheduledShifts.length}</td>
        <td>
          <a
            // FIXME: oh god why
            onClick={(e) => { e.preventDefault(); this.handleDelete(s); }}
            className="delete"
          >
          </a>
        </td>
      </tr>
    ));

    if (!schedules.length) {
      return <h1 className="title">Getting schedules...</h1>
    }

    return (
      <div>
        <Match pattern={`${pathname}/:id`} render={(props: any) => (
          props.params.id === 'new'
            ? null
            : <Schedule route={props} schedule={ScheduleStore.getById(props.params.id)} />
        )} />

        <Match pattern={`${pathname}/:id/:week/:day/new`} render={(props: any) => {
          const shift = {} as IShift;
          const id = props.params.id;
          return (
            <AddShift
              handleNewShift={(s: IShift) => ScheduleStore.newShift(id, s)}
              route={props}
              newShift={shift}
              employees={EmployeeStore.employees}
            />
          );
        }} />

        <Match pattern={`${pathname}/:id/:week/:day/:sid`} render={(props: any) => {
          // this is pretty poor but otherwise both would get matched
          // using `exact` did not work for whatever reason
          if (props.params.sid === 'new') {
            return null;
          }

          const schedule = ScheduleStore
            .schedules
            .find((s: any) => s.id == props.params.id);

          if (!schedule) {
            return null;
          }

          const shift = schedule
            .scheduledShifts
            .find((s: any) => s.id == props.params.sid);

          if (!shift) {
            return null;
          }

          return (
            <UpdateShift
              handleUpdateShift={(s: IShift) => ScheduleStore.updateShift(schedule.id, s.id, s)}
              handleDeleteShift={(s: IShift) => ScheduleStore.deleteShift(schedule.id, s.id)}
              route={props}
              shift={shift}
              employees={EmployeeStore.employees}
            />
          );
        }} />

        <Match pattern={`${pathname}/new`} render={(props: any) => {
          const schedule = {} as ISchedule;

          return (
            <NewScheduleForm
              onSubmit={(s: ISchedule) => ScheduleStore.newSchedule(s)}
              newSchedule={schedule}
            />
          );
        }} />

        <div>
          <h1 className="title">Schedules {newScheduleLink}</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Weeks</th>
                <th>Scheduled shifts</th>
                <th></th>
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
