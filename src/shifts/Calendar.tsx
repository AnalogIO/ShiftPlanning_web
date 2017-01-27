declare const $: any;

import { Moment } from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import * as employees from 'employees';
import { Employee } from 'employees/types';
import { selectors, thunks } from 'shifts';
import { ShiftDto } from 'shifts/types';

import EditShiftModal from './EditShiftModal';
import NewShiftModal from './NewShiftModal';

interface StateProps {
  employees: Employee[];
  shifts: ShiftDto[];
}

interface DispatchProps {
  create: typeof thunks.create;
  update: typeof thunks.update;
  remove: typeof thunks.remove;
}

type Props = StateProps & DispatchProps;

interface State {
  update?: ShiftDto;
  create?: Moment;
}

class Calendar extends React.Component<Props, State> {
  calendar = undefined as any;

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const bodyHeight = document.body.getBoundingClientRect().height;
    const navHeight = document.querySelector('.header')!.getBoundingClientRect()
      .height;
    const calendarHeight = bodyHeight - navHeight - 150;

    this.calendar = $('#calendar').fullCalendar({
      events: this.props.shifts,
      weekNumberCalculation: 'ISO',
      weekNumbers: true,
      weekNumbersWithinDays: true,
      fixedWeekCount: false,
      timeFormat: 'HH:mm',
      slotLabelFormat: 'HH:mm',
      contentHeight: calendarHeight,
      header: {
        right: 'today month,agendaWeek prev,next',
      },
      eventClick: (event: any /* Shift */) => {
        const shift = this.props.shifts.find(s => s.id === event.id);

        this.setState(state => ({
          update: shift,
          create: undefined,
        }));
      },
      dayClick: (date: Moment) => {
        this.setState(state => ({
          update: undefined,
          create: date,
        }));
      },
    });
  }

  closeAllModals = () => ({ create: undefined, update: undefined });

  handleCancel = () => {
    this.setState(this.closeAllModals);
  };

  handleRemove = async (id: number) => {
    try {
      await this.props.remove(id);

      this.setState(this.closeAllModals);

      this.updateCalendar();
    } catch (e) {}
  };

  handleCreateSubmit = async (params: any) => {
    try {
      await this.props.create(params);

      this.setState(this.closeAllModals);

      this.updateCalendar();
    } catch (e) {}
  };

  handleUpdateSubmit = async (params: ShiftDto) => {
    try {
      await this.props.update(params);

      this.setState(this.closeAllModals);

      this.updateCalendar();
    } catch (e) {}
  };

  updateCalendar = () => {
    this.calendar.fullCalendar('removeEventSources');
    this.calendar.fullCalendar('addEventSource', this.props.shifts);
  };

  render() {
    const { create, update } = this.state;

    // Is just easier to understand than nested ternary expressions so wrap
    // these if-statements in an IIFE
    const modal = (() => {
      if (update) {
        return (
          <EditShiftModal
            onCancel={this.handleCancel}
            onRemove={this.handleRemove}
            onSubmit={this.handleUpdateSubmit}
            employees={this.props.employees}
            shift={update}
          />
        );
      }

      if (create) {
        return (
          <NewShiftModal
            onCancel={this.handleCancel}
            onSubmit={this.handleCreateSubmit}
            employees={this.props.employees}
            date={create}
          />
        );
      }

      return undefined;
    })();

    return (
      <div className="ui basic segment">
        <div className="ui container">
          {modal}
          <div id="calendar" />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    employees: employees.selectors.getEmployees(state),
    shifts: selectors.getShiftsAsCalendarEvents(state),
  }),
  { update: thunks.update, remove: thunks.remove, create: thunks.create },
)(Calendar as any);
