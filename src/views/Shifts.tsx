declare var moment: any;
declare var $: any;

import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';

const { Link, Match, Redirect } = require('react-router');

import AddShift from 'components/AddShift';
import UpdateShift from 'components/UpdateShift';
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
      timeFormat: 'HH:mm',
      slotLabelFormat: 'HH:mm',
      contentHeight: calendarHeight,
      header: {
        right: 'today month,agendaWeek prev,next',
      },
      eventClick: (e: any) => {
        this.context.router.transitionTo({
          pathname: '/shifts/update',
          query: {
            id: e.id,
          },
        });
      },
      dayClick: (date: any) => { // moment object
        const year = date.year();
        const month = date.month() + 1;
        const day = date.date();

        const query: any = { year, month, day };

        if (date.hours() !== 0) {
          query.hours = date.hours();
          query.minutes = date.minutes();
        }

        this.context.router.transitionTo({
          query,
          pathname: '/shifts/add',
        });
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

        <Match pattern="/shifts/update" render={(props: any) => {
          const shift = ShiftStore.getShift(props.location.query.id);
          return <UpdateShift
            route={props}
            employees={this.state.employees}
            shift={shift}
            handleUpdateShift={async (s: any) => {
              await ShiftStore.updateShift(s);
              const [shift] = $('#calendar').fullCalendar('clientEvents', [s.id]);
              shift.title = s.employees.map((e: any) => e.firstName).join(', ');
              shift.start = moment(s.start).format('YYYY-MM-DD HH:mm');
              shift.end = moment(s.end).format('YYYY-MM-DD HH:mm');
              shift.employees = s.employees;
              $('#calendar').fullCalendar('updateEvent', shift);
            }}
            handleDeleteShift={async (s: any) => {
              await ShiftStore.deleteShift(s)
              $('#calendar').fullCalendar('removeEvents', [s.id]);
            }}
          />
        }} />
      </div>
    );
  }
}
