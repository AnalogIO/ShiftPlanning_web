import React, { Component, EventHandler, FormEvent } from 'react';

import { Employee } from 'employees/types';
import { ScheduledShiftDto } from 'scheduled_shifts/types';

import Formie from 'react-formie';
import Button from 'shared/Button';
import { Input, NumberInput, SuggestionInput } from 'shared/fields';

interface Props {
  handleSubmit: EventHandler<FormEvent<HTMLFormElement>>;
  employees: Employee[];
  initial: ScheduledShiftDto;
  onDelete: any;
  submitText: string;
}

export default class ScheduleShiftForm extends Component<Props, {}> {
  handleDelete = (e: any) => {
    e.preventDefault();

    const { onDelete, initial } = this.props;

    onDelete(initial.id);
  };

  render() {
    const { initial, employees: employeeList, onDelete } = this.props;

    if (!employeeList) {
      return <div />;
    }

    const timeValidator = (v: string) =>
      !/\d\d:\d\d/.test(v) && 'Time format seems to be wrong';

    const endValidator = (values: any) => {
      if (timeValidator(values.end)) {
        return timeValidator(values.end);
      }

      if (
        values.start &&
        values.end &&
        values.start.slice(0, values.end.length) > values.end
      ) {
        return 'End has to occur later than start';
      }

      if (values.start && values.end && values.start === values.end) {
        return 'End cannot be the same time as start';
      }

      return false;
    };

    return (
      <Formie
        onSubmit={this.props.handleSubmit}
        initial={{ ...initial, employeeIds: initial.employees.map(e => e.id) }}
        validate={{
          start: timeValidator,
          end: (v: any, values: any) => endValidator(values),
          employees: (v: any[]) => v.length === 0 && 'Need employees',
        }}
        form={({ pristine, field, submitting, invalid, handleSubmit }) =>
          <form className="ui form" onSubmit={handleSubmit}>
            {field('start', props =>
              <Input {...props} placeholder="08:00" label="Start" />,
            )}
            {field('end', props =>
              <Input {...props} placeholder="10:00" label="End" />,
            )}
            {field('minOnShift', props =>
              <NumberInput {...props} placeholder="Min on shift" />,
            )}
            {field('maxOnShift', props =>
              <NumberInput {...props} placeholder="Max on shift" />,
            )}
            {field('employeeIds', ({ update }) =>
              <div className="ui field">
                <label>
                  Employees
                  <SuggestionInput
                    initial={initial.employees.map(e => e.id)}
                    items={employeeList.map(e => ({
                      ...e,
                      name: `${e.firstName} ${e.lastName}`,
                    }))}
                    onChange={vals => update(vals.map(e => e.id))}
                  />
                </label>
              </div>,
            )}

            <Button secondary disabled={submitting || pristine || invalid}>
              {this.props.submitText}
            </Button>

            {onDelete &&
              <Button
                negative
                basic
                disabled={submitting}
                onClick={this.handleDelete}
              >
                Delete
              </Button>}
          </form>}
      />
    );
  }
}