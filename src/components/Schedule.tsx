import React from 'react';
import { range, has } from 'lodash';

const { Link } = require('react-router');

import DayShifts from 'components/DayShifts';

export default (props: any) => {
  const { route, schedule } = props;
  const { pathname } = route;

  if (!schedule) {
    return <h2 className="subtitle">Schedule not found!</h2>
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

  const weeks = range(1, schedule.numberOfWeeks + 1).map(w => (
    <div key={w} className="columns">
      <div className="column" style={{alignSelf:'center', flexGrow:.5}}>Week {w}</div>
      {days.map(day => (
        <div key={`${w}:${day}`} className="column has-text-centered">
          <DayShifts schedule={schedule.id} shifts={shifts} day={day} week={w} />
          <Link to={`${pathname}/${w}/${day}/new`}>+ Add shift</Link>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="box">
      <h2 className="subtitle has-text-centered">{schedule.name}</h2>
      {weeks}
      <Link to={`${pathname}/rollout`} className="button">Rollout</Link>
    </div>
  );
}
