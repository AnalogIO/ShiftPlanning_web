import React from 'react';
import { range, has } from 'lodash';

enum Weekday {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export default (props: any) => {
  const { pathname, schedule } = props;

  if (!schedule) {
    return <h2 className="subtitle">Schedule not found!</h2>
  }

  const shift = (shift: any, key: any) => {
    const start = shift.start.split(':', 2).join(':');
    const end = shift.end.split(':', 2).join(':');

    return <div key={key}>{start} - {end}</div>;
  }

  const shifts = schedule.scheduledShifts.reduce((acc: any, s: any) => {
    const day = ((s.day - 1) % 7) + 1; // subtract by 1 to get 0-index based
    const week = Math.ceil(s.day / 7);

    acc[week] = acc[week] || {};
    acc[week][day] = acc[week][day] || [];
    acc[week][day].push(s);

    return acc;
  }, {});

  const days = range(1, 8);

  const weeks = range(1, schedule.numberOfWeeks + 1).map(i => (
    <div key={i} className="columns">
      <div className="column" style={{alignSelf:'center', flexGrow:.5}}>Week {i}</div>
      {days.map(day => (
        <div key={day} className="column has-text-centered">
          <div>{Weekday[day]}</div>
          <div style={{height:'200px', background:'#ddd'}}>
            {has(shifts, [i, day]) ? (
              shifts[i][day].map(shift)
            ) : ''}
          </div>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="box">
      <h2 className="subtitle has-text-centered">{schedule.name}</h2>
      {weeks}
    </div>
  );
}
