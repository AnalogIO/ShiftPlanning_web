declare var $: any;

import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';

const { Link, Match, Redirect } = require('react-router');

import AddShift from 'components/AddShift';
import { IEmployee, IShift } from 'stores';

@inject('stores') @observer
export default class Shifts extends Component<any, {}> {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    employees: [] as IEmployee[],
  };

  @action async componentDidMount() {
    const { EmployeeStore, ShiftStore } = this.props.stores;

    this.setState({
      employees: await EmployeeStore.getEmployees(),
    });

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
      slotLabelFormat: 'HH:mm',
      contentHeight: calendarHeight,
      header: {
        right: 'today month,agendaWeek prev,next',
      },
      eventClick(e: any) {
        console.log(JSON.stringify(e.employees, null, 4));
      },
      dayClick: (date: any) => { // moment object
        const year = date.year();
        const month = date.month() + 1;
        const day = date.date();
        const hours = date.hours() === 0 ? null : date.hours();
        const minutes = date.minutes();
        let path = `/shifts/add?year=${year}&month=${month}&day=${day}`;

        if (hours) {
          path += `&hours=${hours}&minutes=${minutes}`;
        }

        this.context.router.transitionTo(path);
      },
    });
  }

  render() {
    const { ShiftStore } = this.props.stores;

    return (
      <div>
        <div id="calendar"></div>
        <Match pattern="/shifts/add" render={(props: any) => (
          <AddShift
            route={props}
            employees={this.state.employees}
            newShift={{} as any}
            onSubmit={(s: any) => ShiftStore.addShift(s)}
          />
        )} />
      </div>
    );
  }
}
