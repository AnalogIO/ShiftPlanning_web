import React from 'react';
import { connect } from 'react-redux';
import { Location } from 'redux-first-router';

import * as employees from 'employees';
import { routes, selectors } from 'schedules';
import { RootState } from 'shared/types';

import CreateScheduledShift from 'scheduled_shifts/CreateScheduledShift';
import EditScheduledShift from 'scheduled_shifts/EditScheduledShift';
import HeaderHorizontalSplit from 'shared/layouts/HeaderHorizontalSplit';
import CreateSchedule from './CreateSchedule';
import EditSchedule from './EditSchedule';
import Rollout from './Rollout';
import ScheduleVerticalMenu from './ScheduleVerticalMenu';

interface StateProps {
  hasFetched: boolean;
  location: Location;
}

interface DispatchProps {}

const ScheduleScreen = (props: StateProps & DispatchProps) => {
  const { hasFetched, location } = props;

  return (
    <HeaderHorizontalSplit
      headerText="Schedules"
      isLoading={!hasFetched}
      sidebarComponent={<ScheduleVerticalMenu link="schedules" />}
      contentComponent={
        <div className="ui basic segment">
          {location.type === routes.create.type && <CreateSchedule />}
          {location.type === routes.update.type && <EditSchedule />}
          {location.type === routes.rollout.type && <Rollout />}
          {location.type === routes.updateScheduledShift.type &&
            <EditScheduledShift />}
          {location.type === routes.createScheduledShift.type &&
            <CreateScheduledShift />}
        </div>
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  hasFetched:
    selectors.hasFetchedSchedules(state) &&
    employees.selectors.hasFetchedEmployees(state),
  location: state.location,
});

export default connect(mapStateToProps)(ScheduleScreen as any);
