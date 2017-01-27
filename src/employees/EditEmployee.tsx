import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from 'shared/types';
import EditEmployeeForm from './EditEmployeeForm';
import { Employee } from './types';

interface Props {
  employee: Employee;
}

export class EditEmployee extends Component<Props, {}> {
  render() {
    const { employee } = this.props;

    if (!employee) {
      return <div />;
    }

    return <EditEmployeeForm employee={employee} />;
  }
}

const mapStateToProps = ({ employees }: RootState, { match }: any) => {
  const id = parseInt(match.params.id, 10);

  return {
    employee: employees[id],
  };
};

export default connect(mapStateToProps)(EditEmployee as any);
