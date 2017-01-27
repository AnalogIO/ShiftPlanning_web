import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import * as employees from 'employees';
import { selectors, thunks } from 'schedules';
import { RootState } from 'shared/types';

import CreateScheduledShift from 'scheduled_shifts/CreateScheduledShift';
import EditScheduledShift from 'scheduled_shifts/EditScheduledShift';
import HeaderHorizontalSplit from 'shared/layouts/HeaderHorizontalSplit';
import CreateSchedule from './CreateSchedule';
import EditSchedule from './EditSchedule';
import RolloutForm from './RolloutForm';
import ScheduleVerticalMenu from './ScheduleVerticalMenu';

interface StateProps {
  hasFetched: boolean;
}

interface DispatchProps {
  fetchEmployees: typeof employees.thunks.fetchAll;
  fetchSchedules: typeof thunks.fetchAll;
}

class ScheduleScreen extends Component<StateProps & DispatchProps, {}> {
  componentWillMount() {
    this.props.fetchEmployees();
    this.props.fetchSchedules();
  }

  render() {
    return (
      <HeaderHorizontalSplit
        headerText="Schedules"
        isLoading={!this.props.hasFetched}
        sidebarComponent={
          <Route
            children={props =>
              <ScheduleVerticalMenu createNew link="schedules" {...props} />}
          />
        }
        contentComponent={
          <div className="ui basic segment">
            <Route
              exact
              path="/schedules/:id/shifts/:day"
              component={CreateScheduledShift}
            />
            <Route
              path="/schedules/:scheduleId/rollout"
              component={RolloutForm}
            />
            <Route
              path="/schedules/:scheduleId/shifts/:day/:id"
              component={EditScheduledShift}
            />
            <Route path="/schedules/:id" component={EditSchedule} />
            <Route exact path="/schedules" component={CreateSchedule} />
          </div>
        }
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  hasFetched:
    selectors.hasFetchedSchedules(state) &&
    employees.selectors.hasFetchedEmployees(state),
});

export default connect(mapStateToProps, {
  fetchEmployees: employees.thunks.fetchAll,
  fetchSchedules: thunks.fetchAll,
})(ScheduleScreen);
