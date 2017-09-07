import React, { Component } from 'react';
import Link from 'redux-first-router-link';

import { sortBy } from 'lodash';
import { ScheduledShiftDto } from 'scheduled_shifts/types';

enum WeekDays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

interface Props {
  day: number;
  weekDay: number;
  scheduledShifts: ScheduledShiftDto[];
  scheduleId: number;
  newShift: boolean;
  onPreferenceChange?: (day: number, start: string, value: number) => void;
}

export default class DaySchedule extends Component<Props, {}> {
  render() {
    const { newShift, day, weekDay, scheduledShifts, scheduleId } = this.props;
    const { onPreferenceChange } = this.props;

    // u2014 is an en dash
    const time = (s: ScheduledShiftDto) =>
      `${s.start.slice(0, 5)}\u2014${s.end.slice(0, 5)}`;

    return (
      <div className="column">
        <div className="ui fluid card">
          <div className="content center aligned">
            <p className="header">
              {WeekDays[day]}
            </p>
            {sortBy(scheduledShifts, 'start').map(s =>
              <div key={s.id}>
                {onPreferenceChange && time(s)}
                {!onPreferenceChange &&
                  <Link
                    to={`/schedules/${scheduleId}/shifts/${weekDay}/${s.id}`}
                  >
                    {time(s)}
                  </Link>}
                {onPreferenceChange &&
                  <select
                    onChange={e =>
                      onPreferenceChange(
                        s.day,
                        s.start,
                        Number(e.target.value),
                      )}
                  >
                    <option value="0">-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>}
              </div>,
            )}
          </div>
          {newShift &&
            <div className="extra content center aligned">
              <Link to={`/schedules/${scheduleId}/shifts/${weekDay}`}>
                + Add Shift
              </Link>
            </div>}
        </div>
      </div>
    );
  }
}
