import React from 'react';
import { connect } from 'react-redux';

import { selectors } from 'employees';
import { Maybe } from 'shared/types';
import EditEmployeeForm from './EditEmployeeForm';
import { Employee } from './types';

interface Props {
  employee: Maybe<Employee>;
}

export const EditEmployee = ({ employee }: Props) => {
  if (!employee) {
    return <div />;
  }

  return <EditEmployeeForm employee={employee} />;
};

export default connect(state => ({
  employee: selectors.getById(state, state.location.payload.employeeId),
}))(EditEmployee);
