import moment from 'moment';
import { Moment } from 'moment';
import React from 'react';

import { Employee } from 'employees/types';

import Button from 'shared/Button';
import { SuggestionInput } from 'shared/fields';
import Modal, { ModalActions, ModalContent, ModalHeader } from 'shared/Modal';

interface Props {
  date: Moment;
  employees: Employee[];
  onCancel?: () => void;
  onSubmit: (state: State) => void;
}

interface State {
  start: string;
  end: string;
  employees: Employee[];
}

export type SubmitParams = State;

export default class NewShiftModal extends React.Component<Props, State> {
  state = {
    start: '08:00',
    end: '10:00',
    employees: [],
  };

  handleInputChange = (key: string, value: any) => {
    this.setState(state => ({ [key]: value }));
  };

  handleCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  handleSubmit = () => {
    const [startHours, startMinutes] = this.state.start.split(':').map(Number);
    const [endHours, endMinutes] = this.state.end.split(':').map(Number);

    const date = moment(this.props.date);

    date.hours(startHours);
    date.minutes(startMinutes);

    const start = date.format();

    date.hours(endHours);
    date.minutes(endMinutes);

    const end = date.format();

    const { employees } = this.state;

    const shift = { employees, start, end };

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
                  items={this.props.employees.map(e => ({
                    ...e,
                    name: `${e.firstName} ${e.lastName}`,
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
            <Button primary onClick={this.handleSubmit}>
              Create
            </Button>
          </ModalActions>
        </Modal>
      </form>
    );
  }
}
