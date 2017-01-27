import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { thunks } from 'scheduled_shifts';
import { RootState } from 'shared/types';

import ScheduledShiftForm from './ScheduledShiftForm';

const mapStateToProps = (state: RootState, ownProps: any) => ({
  submitText: 'Update scheduled shift',
  initial: ownProps.scheduledShift,
  employees: ownProps.employees,
});

const mapDispatchToProps = (dispatch: Dispatch<any>, { schedule }: any) => ({
  async handleSubmit(data: any) {
    return dispatch(thunks.update(schedule.id, data));
  },
  async onDelete(id: number) {
    if (!confirm('Are you sure you want to delete the scheduled shift?')) {
      return;
    }

    return dispatch(thunks.remove(schedule, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ScheduledShiftForm as any,
);
