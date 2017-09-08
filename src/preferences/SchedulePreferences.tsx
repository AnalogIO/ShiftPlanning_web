import React from 'react';
import { connect } from 'react-redux';

import * as schedules from 'schedules';
import { ScheduleDto } from 'schedules/types';
import { RootState } from 'shared/types';

import WeekPreferenceSchedule from './WeekPreferenceSchedule';

interface Props {
  schedule: ScheduleDto;
}

const SchedulePreferences = (props: Props) => (
  <WeekPreferenceSchedule schedule={props.schedule} />
);

const { selectors: { getById } } = schedules;

const mapStateToProps = (state: RootState) => ({
  schedule: getById(state, state.location.payload.scheduleId),
});

export default connect(mapStateToProps)(SchedulePreferences);
