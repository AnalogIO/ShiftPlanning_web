import React, { Component } from 'react';
import { interval } from 'utils';

import { ScheduledShiftDto } from 'scheduled_shifts/types';
import { ScheduleDto } from 'schedules/types';

import DaySchedule from 'schedules/DaySchedule';

interface Props {
  newShifts: boolean;
  schedule: ScheduleDto;
  weekNumber: number;
}

export default class WeekSchedule extends Component<Props, {}> {
  getScheduledShifts(weekDay: number, scheduledShifts: ScheduledShiftDto[]) {
    return scheduledShifts.filter(s => weekDay + 1 === s.day);
  }

  render() {
    const { newShifts, weekNumber, schedule } = this.props;
    const { scheduledShifts } = schedule;

    const days = interval(7).map(i => {
      const weekDay = weekNumber * 7 + i;

      return (
        <DaySchedule
          key={weekDay}
          weekDay={weekDay + 1}
          day={weekDay % 7}
          scheduledShifts={this.getScheduledShifts(weekDay, scheduledShifts)}
          scheduleId={schedule.id}
          newShift={newShifts}
        />
      );
    });

    return (
      <div style={{ marginBottom: '2em' }}>
        <h2 className="header" style={{ textAlign: 'center' }}>
          Week {weekNumber + 1}
        </h2>
        <div className="ui seven column grid">
          {days}
        </div>
      </div>
    );
  }
}
