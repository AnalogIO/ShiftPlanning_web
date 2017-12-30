import React from 'react';
import { connect } from 'react-redux';

import * as schedules from 'schedules';
import { ScheduleDto } from 'schedules/types';
import { RootState } from 'shared/types';

import WeekPreferenceSchedule from './WeekPreferenceSchedule';

interface Props {
  schedule: ScheduleDto;
  preferences: { [id: number]: { [id: number]: number } };
}

const SchedulePreferences = (props: Props) => (
  <WeekPreferenceSchedule
    schedule={props.schedule}
    preferences={props.preferences}
  />
);

const { selectors: { getById } } = schedules;

const mapStateToProps = (state: RootState) => ({
  schedule: getById(state, state.location.payload.scheduleId),
  preferences: state.preferences,
});

export default connect(mapStateToProps)(SchedulePreferences);
