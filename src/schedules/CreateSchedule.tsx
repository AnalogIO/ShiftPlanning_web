import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { thunks } from 'schedules';
import { ScheduleDto } from './types';

import CreateScheduleForm from './CreateScheduleForm';

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  async handleSubmit(formValues: ScheduleDto) {
    return dispatch(thunks.create(formValues));
  },
});

export default connect(undefined, mapDispatchToProps)(
  CreateScheduleForm as any,
);
