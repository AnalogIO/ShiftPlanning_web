import React from 'react';
import { connect } from 'react-redux';
import { Location } from 'redux-first-router';

import { hasFetchedSchedules } from 'schedules/selectors';
import { RootState } from 'shared/types';

import { routes } from 'preferences';
import ScheduleVerticalMenu from 'schedules/ScheduleVerticalMenu';
import HeaderHorizontalSplit from 'shared/layouts/HeaderHorizontalSplit';
import SchedulePreferences from './SchedulePreferences';

interface StateProps {
  hasFetched: boolean;
  location: Location;
}

const PreferenceScreen = (props: StateProps) => (
  <HeaderHorizontalSplit
    headerText="Preferences"
    isLoading={!props.hasFetched}
    sidebarComponent={
      <ScheduleVerticalMenu link="preferences" createNew={false} />
    }
    contentComponent={
      <div className="ui basic segment">
        {props.location.type === routes.update.type && <SchedulePreferences />}
      </div>
    }
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  hasFetched: (() => {
    if (state.location.type === routes.update.type) {
      return (
        hasFetchedSchedules(state) &&
        !!state.preferences[state.location.payload.scheduleId]
      );
    }

    return hasFetchedSchedules(state);
  })(),
  location: state.location,
});

export default connect(mapStateToProps)(PreferenceScreen);
