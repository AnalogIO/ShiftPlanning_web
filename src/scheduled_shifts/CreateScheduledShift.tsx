import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEmployees } from 'employees/selectors';
import { Employee } from 'employees/types';
import { ScheduleDto } from 'schedules/types';
import { RootState } from 'shared/types';

import CreateScheduledShiftForm from './CreateScheduledShiftForm';

interface Props {
  day: number;
  employees: Employee[];
  schedule: ScheduleDto;
}

export class CreateScheduleShift extends Component<Props, {}> {
  render() {
    const { day, employees, schedule } = this.props;

    return (
      <CreateScheduledShiftForm
        day={day}
        employees={employees}
        schedule={schedule}
      />
    );
  }
}

const mapStateToProps = (state: RootState, { match }: any) => {
  const id = parseInt(match.params.id, 10);
  const day = parseInt(match.params.day, 10);
  const schedule = state.schedules[id];

  return {
    day,
    employees: getEmployees(state),
    schedule,
  };
};

export default connect(mapStateToProps)(CreateScheduleShift as any);
