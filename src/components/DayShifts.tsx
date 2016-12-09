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
  const { shifts, day, week } = props;

  const shift = (shift: any, key: any) => {
    const start = shift.start.split(':', 2).join(':');
    const end = shift.end.split(':', 2).join(':');

    return <div key={key}>{start} - {end}</div>;
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
