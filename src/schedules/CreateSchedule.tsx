import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { thunks } from 'schedules';
import { RootState } from 'shared/types';
import { ScheduleDto } from './types';

import CreateScheduleForm from './CreateScheduleForm';

// do not pass form to the CreateScheduleForm component
// otherwise the string passed will get overriden with the object
const mapStateToProps = ({ form, ...state }: RootState) => state;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  async handleSubmit(formValues: ScheduleDto) {
    return dispatch(thunks.create(formValues));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateScheduleForm as any,
);
