import React from 'react';
import { connect } from 'react-redux';

import { getScheduleById } from 'schedules/selectors';
import { ScheduleDto } from 'schedules/types';
import { RootState } from 'shared/types';

import WeekPreferenceSchedule from './WeekPreferenceSchedule';

interface Props {
  schedule: ScheduleDto;
}

const SchedulePreferences = (props: Props) =>
  <WeekPreferenceSchedule schedule={props.schedule} />;

const mapStateToProps = (state: RootState) => ({
  schedule: getScheduleById(state, state.location.payload.scheduleId),
});

export default connect(mapStateToProps)(SchedulePreferences);
