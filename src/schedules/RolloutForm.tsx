declare var moment: any;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { thunks } from 'schedules';

import Formie from 'react-formie';
import Button from 'shared/Button';
import { Input, NumberInput } from 'shared/fields';
interface StateProps {}

interface DispatchProps {
  handleSubmit: any;
}

class RolloutForm extends Component<StateProps & DispatchProps, {}> {
  render() {
    return (
      <Formie
        initial={{ from: '', to: '', startFrom: 1 }}
        onSubmit={this.props.handleSubmit}
        validate={{
          from: (v: string) =>
            !/\d\d-\d\d-\d\d/.test(v) && 'Date looks wrongly formatted',
          to: (v: string) =>
            !/\d\d-\d\d-\d\d/.test(v) && 'Date looks wrongly formatted',
          startFrom: (v: number) =>
            v === 0 && 'Has to start from a positive week',
        }}
        form={({
          handleSubmit,
          submitting,
          pristine,
          invalid,
          field,
          ...rest,
        }) =>
          <form className="ui form" onSubmit={handleSubmit}>
            {field('from', props =>
              <Input {...props} placeholder="dd-mm-yy" label="From" />,
            )}
            {field('to', props =>
              <Input {...props} placeholder="dd-mm-yy" label="To" />,
            )}
            {field('startFrom', props =>
              <NumberInput {...props} placeholder="Week to start from" />,
            )}

            <Button disabled={submitting || pristine || invalid}>
              Roll out!
            </Button>
          </form>}
      />
    );
  }
}

export default connect(
  state => ({}),
  (dispatch, ownProps) => ({
    async handleSubmit(formValues: any) {
      const { match: { params: { scheduleId } } } = ownProps as any;
      const from = moment(formValues.from, 'DD-MM-YY').format('DD-MM-YYYY');
      const to = moment(formValues.to, 'DD-MM-YY').format('DD-MM-YYYY');

      return dispatch(
        thunks.rollout(scheduleId, from, to, formValues.startFrom),
      );
    },
  }),
)(RolloutForm as any);
