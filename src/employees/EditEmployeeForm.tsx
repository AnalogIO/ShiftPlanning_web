import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { thunks } from 'employees';
import { RootState } from 'shared/types';
import { selectors } from 'titles';
import { Employee } from './types';

import EmployeeForm from './EmployeeForm';

const mapStateToProps = (state: RootState, ownProps: any) => ({
  submitText: 'Update employee',
  initial: ownProps.employee,
  options: selectors.getTitles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  async handleSubmit(formValues: Employee) {
    return dispatch(thunks.update(formValues));
  },
  async onDelete(id: number) {
    return dispatch(thunks.remove(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeForm as any,
);
