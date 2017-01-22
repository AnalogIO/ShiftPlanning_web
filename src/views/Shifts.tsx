declare var $: any;

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';

import { IShift } from 'stores';

@inject('stores') @observer
export default class Shifts extends Component<any, {}> {
  @action async componentDidMount() {
    const { ShiftStore } = this.props.stores;

    const shifts = (await ShiftStore.getShifts())
      .map((s: IShift) => {
        s.title = s.employees.map((e: any) => e.firstName).sort().join(', ');
        return s;
      });

    const bodyHeight = document.body.getBoundingClientRect().height;
    const navHeight = document.querySelector('.nav').getBoundingClientRect().height;
    const calendarHeight = bodyHeight - navHeight - 150;

    $('#calendar').fullCalendar({
      weekNumberCalculation: 'ISO',
      weekNumbers: true,
      weekNumbersWithinDays: true,
      fixedWeekCount: false,
      events: shifts,
      timeFormat: 'HH:mm',
      contentHeight: calendarHeight,
      header: {
        right: 'today month,agendaWeek prev,next',
      },
      eventClick(e: any) {
        console.log(JSON.stringify(e.employees, null, 4));
      },
    });
  }

  render() {
    return <div id="calendar"></div>
  }
}
