import React from 'react';
import { range, has } from 'lodash';

const { Link } = require('react-router');

import { IScheduledShift } import 'stores';

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
  const { schedule, shifts, day, week } = props;

  const shift = (shift: any, key: any) => {
    const start = shift.start.split(':', 2).join(':');
    const end = shift.end.split(':', 2).join(':');

    return (
      <Link
        to={`/schedules/${schedule}/${week}/${day}/${shift.id}`}
        style={{ display: 'block' }}
        key={key}
      >
        {start} - {end}
      </Link>
    );
  }

  return (
    <div>
      <div>{Weekday[day]}</div>
      <div style={{height:'200px', background:'#ddd'}}>
        {has(shifts, [week, day]) ? (
          shifts[week][day].map(shift)
        ) : ''}
      </div>
    </div>
  );
}
