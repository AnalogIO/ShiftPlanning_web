import React, { Component, EventHandler, FormEvent } from 'react';

import Formie from 'react-formie';

import Button from 'shared/Button';
import { Input, NumberInput } from 'shared/fields';

interface Props {
  handleSubmit: EventHandler<FormEvent<HTMLFormElement>>;
  submitting: boolean;
  invalid: boolean;
  pristine: boolean;
}

export default class extends Component<Props, {}> {
  render() {
    return (
      <Formie
        initial={{ name: '', numberOfWeeks: 2 }}
        onSubmit={this.props.handleSubmit}
        validate={{
          name: (v: string) => !v && 'Name required',
          numberOfWeeks: (v: number) =>
            v === 0 && '# of weeks has to be greater than zero',
        }}
        form={({ handleSubmit, field, submitting, invalid }) =>
          <form className="ui form" onSubmit={handleSubmit}>
            {field('name', props => <Input {...props} placeholder="Name" />)}
            {field('numberOfWeeks', props =>
              <NumberInput {...props} placeholder="# of Weeks" />,
            )}

            <Button
              primary
              disabled={submitting || invalid}
              loading={submitting}
            >
              Create schedule
            </Button>
          </form>}
      />
    );
  }
}
