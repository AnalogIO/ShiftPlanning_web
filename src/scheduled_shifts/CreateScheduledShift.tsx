import React from 'react';
import { connect } from 'react-redux';

import * as employees from 'employees';
import { Employee } from 'employees/types';
import { selectors } from 'schedules';
import { ScheduleDto } from 'schedules/types';
import { RootState } from 'shared/types';

import EditSchedule from 'schedules/EditSchedule';
import CreateScheduledShiftForm from './CreateScheduledShiftForm';

interface Props {
  day: number;
  employeeList: Employee[];
  schedule: ScheduleDto;
}

export const CreateScheduleShift = (props: Props) => {
  const { day, employeeList, schedule } = props;

  return (
    <div>
      <CreateScheduledShiftForm
        day={day}
        employees={employeeList}
        schedule={schedule}
      />
      <EditSchedule />
    </div>
  );
};

const mapStateToProps = (state: RootState, { match }: any) => {
  const { scheduleId, day } = state.location.payload;

  return {
    day,
    employeeList: employees.selectors.getEmployees(state),
    schedule: selectors.getScheduleById(state, scheduleId),
  };
};

export default connect(mapStateToProps)(CreateScheduleShift);
