import React from 'react';
import { connect } from 'react-redux';

import { routes, selectors } from 'employees';
import { RootState } from 'shared/types';
import * as titles from 'titles';

import HeaderHorizontalSplit from 'shared/layouts/HeaderHorizontalSplit';
import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';
import EmployeesVerticalMenu from './EmployeesVerticalMenu';

interface StateProps {
  hasFetched: boolean;
  path: string;
}

interface DispatchProps {}

const EmployeeScreen = ({ hasFetched, path }: StateProps & DispatchProps) =>
  <HeaderHorizontalSplit
    isLoading={!hasFetched}
    headerText="Employees"
    sidebarComponent={<EmployeesVerticalMenu />}
    contentComponent={
      <div className="ui basic segment">
        {path === routes.create.type && <CreateEmployee />}
        {path === routes.update.type && <EditEmployee />}
      </div>
    }
  />;

const mapStateToProps = (state: RootState) => ({
  hasFetched:
    selectors.hasFetchedEmployees(state) &&
    titles.selectors.hasFetchedTitles(state),
  path: state.location.type,
});

export default connect(mapStateToProps)(EmployeeScreen);
