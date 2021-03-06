import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as employees from 'employees';
import { Employee } from 'employees/types';
import { RootState } from 'shared/types';
import { selectors } from 'shifts';
import { ShiftDto } from './types';

import Header from 'shared/layouts/Header';
import Calendar from 'shifts/Calendar';

interface StateProps {
  hasFetched: boolean;
  employees: Employee[];
  shifts: ShiftDto[];
}

interface DispatchProps {}

type Props = StateProps & DispatchProps;

class ShiftScreen extends Component<Props, {}> {
  render() {
    return (
      <Header
        headerText="Shifts"
        isLoading={!this.props.hasFetched}
        contentComponent={<Calendar />}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  hasFetched:
    employees.selectors.hasFetchedEmployees(state) &&
    selectors.hasFetchedShifts(state),
});

export default connect(mapStateToProps)(ShiftScreen as any);
