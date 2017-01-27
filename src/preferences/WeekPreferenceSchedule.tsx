import React from 'react';

import { api } from 'preferences';
import { ScheduledShiftDto } from 'scheduled_shifts/types';
import { ScheduleDto } from 'schedules/types';
import { interval } from 'utils';
import { Preference } from './types';

import DaySchedule from 'schedules/DaySchedule';
import Button from 'shared/Button';

interface Props {
  schedule: ScheduleDto;
}

interface State {
  preferences: Preference[];
}

const getScheduledShifts = (
  weekDay: number,
  scheduledShifts: ScheduledShiftDto[],
) => scheduledShifts.filter(s => weekDay + 1 === s.day);

class WeekPreferenceSchedule extends React.Component<Props, State> {
  state = {
    preferences: [] as Preference[],
  };

  handlePreferenceChange = (day: number, start: string, priority: number) => {
    const { schedule } = this.props;

    const preferences = schedule.scheduledShifts
      .filter(ss => ss.start === start && (ss.day - day) % 7 === 0)
      .map(ss => ({ scheduledShiftId: ss.id, priority } as Preference));

    const ids = preferences.map(p => p.scheduledShiftId);

    const oldPreferences = this.state.preferences.filter(
      p => ids.indexOf(p.scheduledShiftId) === -1,
    );

    this.setState(state => ({
      preferences: [...oldPreferences, ...preferences],
    }));
  };

  handleSavePreferences = () => {
    const { preferences } = this.state;
    const { schedule } = this.props;

    api.setPreferences(schedule.id, preferences);
  };

  render() {
    const { schedule } = this.props;
    const { scheduledShifts } = schedule;

    const days = interval(7).map(i =>
      <DaySchedule
        key={i}
        weekDay={i}
        day={i}
        scheduledShifts={getScheduledShifts(i, scheduledShifts)}
        scheduleId={schedule.id}
        newShift={false}
        onPreferenceChange={this.handlePreferenceChange}
      />,
    );

    return (
      <div>
        <div className="ui seven column grid">
          {days}
        </div>
        <Button onClick={this.handleSavePreferences}>Save</Button>
      </div>
    );
  }
}

export default WeekPreferenceSchedule;
