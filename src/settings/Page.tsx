import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as app from 'app';
import { CurrentUser } from 'app/types';
import * as employees from 'employees';
import { Employee } from 'employees/types';
import { RootState } from 'shared/types';

import Header from 'shared/layouts/Header';
import UserSettingsForm from './UserSettingsForm';

interface StateProps {
  user: CurrentUser;
  employees: Employee[];
}

interface DispatchProps {
  fetch: () => void;
}

class SettingScreen extends Component<StateProps & DispatchProps, {}> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { user, employees: employeeList } = this.props;

    return (
      <Header
        className="ui basic segment"
        headerText="Settings"
        isLoading={employeeList.length === 0}
        contentComponent={
          <UserSettingsForm user={user} employees={employeeList} />
        }
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  user: app.selectors.getCurrentUser(state)!,
  employees: employees.selectors.getEmployees(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  fetch: () => dispatch(employees.thunks.fetchAll),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
