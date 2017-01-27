import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as employees from 'employees';
import * as scheduledShifts from 'scheduled_shifts';
import { RootState } from 'shared/types';

import ScheduledShiftForm from './ScheduledShiftForm';

const mapStateToProps = (state: RootState) => ({
  submitText: 'Add schedule shift',
  employees: employees.selectors.getEmployees(state),
  initial: {
    start: '',
    end: '',
    employees: [],
  },
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>,
  { schedule, day }: any,
) => ({
  async handleSubmit(data: any) {
    return dispatch(scheduledShifts.thunks.create(schedule.id, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ScheduledShiftForm as any,
);
