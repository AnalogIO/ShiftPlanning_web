import moment from 'moment';
import React from 'react';

import { Employee } from 'employees/types';
import { ShiftDto } from './types';

import Button from 'shared/Button';
import { SuggestionInput } from 'shared/fields';
import Modal, { ModalActions, ModalContent, ModalHeader } from 'shared/Modal';

interface Props {
  shift: ShiftDto;
  employees: Employee[];
  onCancel?: () => void;
  onRemove?: (id: number) => void;
  onSubmit: (state: State) => void;
}

interface State {
  start: string;
  end: string;
  employees: Employee[];
}

export default class EditShiftModal extends React.Component<Props, State> {
  state = {
    start: moment(this.props.shift.start).format('HH:mm'),
    end: moment(this.props.shift.end).format('HH:mm'),
    employees: this.props.shift.employees,
  };

  handleInputChange = (key: string, value: any) => {
    this.setState(state => ({ [key]: value }));
  };

  handleCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  handleRemove = (id: number) => {
    if (this.props.onRemove) {
      this.props.onRemove(id);
    }
  };

  handleSubmit = () => {
    const [startHours, startMinutes] = this.state.start.split(':').map(Number);
    const [endHours, endMinutes] = this.state.end.split(':').map(Number);

    const _start = moment(this.props.shift.start);
    const _end = moment(this.props.shift.end);

    _start.hours(startHours);
    _start.minutes(startMinutes);

    _end.hours(endHours);
    _end.minutes(endMinutes);

    const start = _start.format();
    const end = _end.format();

    const { employees } = this.state;

    const shift = { ...this.props.shift, employees, start, end } as ShiftDto;

    this.props.onSubmit(shift);
  };

  render() {
    return (
      <form className="ui form" onSubmit={e => e.preventDefault()}>
        <Modal onOuterClick={this.handleCancel}>
          <ModalHeader>Header</ModalHeader>
          <ModalContent>
            <div className="field">
              <label>
                Start
                <input
                  value={this.state.start}
                  onChange={e =>
                    this.handleInputChange('start', e.target.value)}
                />
              </label>
            </div>
            <div className="field">
              <label>
                End
                <input
                  value={this.state.end}
                  onChange={e => this.handleInputChange('end', e.target.value)}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Employees
                <SuggestionInput
                  initial={this.props.shift.employees.map(e => e.id)}
                  items={this.props.employees.map(e => ({
                    id: e.id,
                    name: `${e.firstName} ${e.lastName}`,
                    locked: false,
                  }))}
                  onChange={items => this.handleInputChange('employees', items)}
                />
              </label>
            </div>
          </ModalContent>
          <ModalActions>
            <Button basic onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button
              basic
              negative
              onClick={() => this.handleRemove(this.props.shift.id)}
            >
              Remove
            </Button>
            <Button primary onClick={this.handleSubmit}>
              Update
            </Button>
          </ModalActions>
        </Modal>
      </form>
    );
  }
}
