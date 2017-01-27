import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  fetchAll: any;
}

class SettingScreen extends Component<StateProps & DispatchProps, {}> {
  componentWillMount() {
    this.props.fetchAll();
  }

  render() {
    const { user, employees: employeeList } = this.props;

    // TODO: let the form type check instead of casting to `any`
    const AnyUserSettingsForm = UserSettingsForm as any;

    return (
      <Header
        className="ui basic segment"
        headerText="Settings"
        isLoading={employeeList.length === 0}
        contentComponent={
          <AnyUserSettingsForm user={user} employees={employeeList} />
        }
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: app.selectors.getCurrentUser(state)!,
    employees: employees.selectors.getEmployees(state),
  };
};

export default connect(mapStateToProps, {
  fetchAll: employees.thunks.fetchAll,
})(SettingScreen);
