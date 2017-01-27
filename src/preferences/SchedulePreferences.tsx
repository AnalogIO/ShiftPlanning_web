import React from 'react';
import { connect } from 'react-redux';

import { getScheduleById } from 'schedules/selectors';
import { ScheduleDto } from 'schedules/types';

import WeekPreferenceSchedule from './WeekPreferenceSchedule';

interface StateProps {
  schedule: ScheduleDto;
}

interface DispatchProps {}

class SchedulePreferences extends React.Component<
  StateProps & DispatchProps,
  {}
> {
  render() {
    return <WeekPreferenceSchedule schedule={this.props.schedule} />;
  }
}

export default connect((state, { match }: any) => {
  const id = parseInt(match.params.id, 10);

  return {
    schedule: getScheduleById(state, id),
  };
})(SchedulePreferences as any);
