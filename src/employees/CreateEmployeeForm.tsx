import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { thunks } from 'employees';
import { RootState } from 'shared/types';
import * as titles from 'titles';
import { TitleState } from 'titles/types';
import { Employee } from './types';

import EmployeeForm from './EmployeeForm';

const initialValues = (titleList: TitleState) => {
  const employee = {
    active: true,
    checkInCount: 0,
    email: '',
    employeeTitle: '',
    firstName: '',
    lastName: '',
    photoRef: '',
  };

  if (!titleList.result) {
    return {
      ...employee,
      employeeTitleId: undefined,
    };
  }

  const employeeTitleId = titleList[titleList.result[0]].id;

  return {
    ...employee,
    employeeTitleId,
  };
};

const mapStateToProps = (state: RootState) => ({
  submitText: 'Create employee',
  initial: initialValues(state.titles),
  options: titles.selectors.getTitles(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  async handleSubmit(formValues: Employee) {
    return dispatch(thunks.create(formValues));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  EmployeeForm as any,
);
