import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Dispatch } from 'redux';

import * as employees from 'employees';
import { RootState } from 'shared/types';
import * as titles from 'titles';
import { hasFetchedTitles } from 'titles/selectors';
import { hasFetchedEmployees } from './selectors';

import HeaderHorizontalSplit from 'shared/layouts/HeaderHorizontalSplit';
import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';
import EmployeesVerticalMenu from './EmployeesVerticalMenu';

interface StateProps {}

interface DispatchProps {
  fetch: () => undefined;
  hasFetched: boolean;
}

class EmployeeScreen extends Component<StateProps & DispatchProps, {}> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <HeaderHorizontalSplit
        isLoading={!this.props.hasFetched}
        headerText="Employees"
        sidebarComponent={
          <Route children={props => <EmployeesVerticalMenu {...props} />} />
        }
        contentComponent={
          <div className="ui basic segment">
            <Route path="/employees/:id" component={EditEmployee} />
            <Route exact path="/employees" component={CreateEmployee} />
          </div>
        }
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  hasFetched: hasFetchedEmployees(state) && hasFetchedTitles(state),
});

const fetch = () => (dispatch: Dispatch<any>) => {
  dispatch(employees.thunks.fetchAll());
  dispatch(titles.thunks.fetchAll());
};

export default connect(mapStateToProps, { fetch })(EmployeeScreen as any);
