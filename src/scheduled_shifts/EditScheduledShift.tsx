import { denormalize } from 'normalizr';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEmployees, hasFetchedEmployees } from 'employees/selectors';
import { Employee } from 'employees/types';
import { ScheduledShiftDto } from 'scheduled_shifts/types';
import { ScheduleDto } from 'schedules/types';
import { scheduledShiftSchema } from 'schemas';
import { RootState } from 'shared/types';

import EditScheduledShiftForm from './EditScheduledShiftForm';

interface Props {
  employees: Employee[];
  schedule: ScheduleDto;
  scheduledShift: ScheduledShiftDto;
}

export class EditScheduleShift extends Component<Props, {}> {
  render() {
    const { employees, schedule, scheduledShift } = this.props;

    if (!employees || !schedule || !scheduledShift) {
      return <div />;
    }

    return (
      <EditScheduledShiftForm
        employees={employees}
        schedule={schedule}
        scheduledShift={scheduledShift}
      />
    );
  }
}

const mapStateToProps = (state: RootState, { match }: any) => {
  const { employees, schedules, scheduledShifts } = state;

  if (!hasFetchedEmployees(state)) {
    return {};
  }

  const id = parseInt(match.params.id, 10);
  // const day = parseInt(match.params.day, 10);
  const scheduleId = parseInt(match.params.scheduleId, 10);
  const schedule = schedules[scheduleId];

  if (!schedule) {
    return {};
  }

  const entities = { employees };
  const scheduledShift = denormalize(
    scheduledShifts[id],
    scheduledShiftSchema,
    entities,
  );

  if (!scheduledShift) {
    return {};
  }

  return {
    employees: getEmployees(state),
    schedule,
    scheduledShift,
  };
};

export default connect(mapStateToProps)(EditScheduleShift as any);
