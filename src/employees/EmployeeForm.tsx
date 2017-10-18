import React, { Component, EventHandler, FormEvent } from 'react';

import Formie from 'react-formie';
import { Checkbox, Dropdown, Input } from 'shared/fields';

import Button from 'shared/Button';
import { Title } from 'titles/types';
import { Employee } from './types';

interface Props {
  options: Title[];
  initial: Employee;
  submitText: string;
  handleSubmit: EventHandler<FormEvent<HTMLFormElement>>;
  submitting: boolean;
  invalid: boolean;
  pristine: boolean;
  onDelete: any;
}

export default class EmployeeForm extends Component<Props, {}> {
  handleDelete = (e: any) => {
    e.preventDefault();

    const { onDelete, initial } = this.props;

    onDelete(initial.id);
  };

  render() {
    const { onDelete } = this.props;

    return (
      <Formie
        initial={this.props.initial}
        validate={{
          email: ({ email }: Employee) =>
            !/.+@.+/.test(email) && 'Invalid email',
          firstName: ({ firstName }: Employee) =>
            firstName.length === 0 && 'First name must not be empty',
          lastName: ({ lastName }: Employee) =>
            lastName.length === 0 && 'Last name must not be empty',
        }}
        onSubmit={this.props.handleSubmit}
        form={({
          field,
          submitting,
          pristine,
          invalid,
          handleSubmit,
          values,
          errors,
        }) => (
          <form className="ui form" onSubmit={handleSubmit}>
            {field('email', props => <Input placeholder="Email" {...props} />)}

            {field('firstName', props => (
              <Input placeholder="First name" {...props} />
            ))}

            {field('lastName', props => (
              <Input placeholder="Last name" {...props} />
            ))}

            {field('employeeTitleId', props => (
              <Dropdown
                {...props}
                placeholder="Employee title"
                options={this.props.options}
              />
            ))}

            {field('active', props => <Checkbox label="Active" {...props} />)}

            <Button primary disabled={submitting || pristine || invalid}>
              {this.props.submitText}
            </Button>

            {onDelete && (
              <Button
                negative
                basic
                disabled={submitting}
                onClick={this.handleDelete}
              >
                Remove
              </Button>
            )}
          </form>
        )}
      />
    );
  }
}
