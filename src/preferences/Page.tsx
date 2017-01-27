import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { hasFetchedSchedules } from 'schedules/selectors';

import ScheduleVerticalMenu from 'schedules/ScheduleVerticalMenu';
import HeaderHorizontalSplit from 'shared/layouts/HeaderHorizontalSplit';
import SchedulePreferences from './SchedulePreferences';

interface StateProps {
  hasFetched: boolean;
}

class PreferenceScreen extends React.Component<StateProps, {}> {
  render() {
    return (
      <HeaderHorizontalSplit
        headerText="Preferences"
        isLoading={!this.props.hasFetched}
        sidebarComponent={
          <Route
            children={props =>
              <ScheduleVerticalMenu
                link="preferences"
                createNew={false}
                {...props}
              />}
          />
        }
        contentComponent={
          <div className="ui basic segment">
            <Route
              exact
              path="/preferences/:id"
              component={SchedulePreferences}
            />
          </div>
        }
      />
    );
  }
}

export default connect(state => ({ hasFetched: hasFetchedSchedules(state) }))(
  PreferenceScreen as any,
);
