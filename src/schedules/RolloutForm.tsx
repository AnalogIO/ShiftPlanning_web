declare var moment: any;

import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { thunks } from 'schedules';
import { selectors } from 'schedules';
import { RootState } from 'shared/types';

import Formie from 'react-formie';
import Button from 'shared/Button';
import { Input, NumberInput } from 'shared/fields';

const initial = { from: '', to: '', startFrom: 1 };

type t = typeof initial;

interface StateProps {
  scheduleId: number;
}

interface DispatchProps {
  handleSubmit: (values: t, scheduleId: number) => void;
}

const RolloutForm = (props: StateProps & DispatchProps) => (
  <Formie
    initial={initial}
    onSubmit={(values: t) => props.handleSubmit(values, props.scheduleId)}
    validate={{
      from: ({ from }: t) =>
        !/\d\d-\d\d-\d\d/.test(from) && 'Date looks wrongly formatted',
      to: ({ to }: t) =>
        !/\d\d-\d\d-\d\d/.test(to) && 'Date looks wrongly formatted',
      startFrom: ({ startFrom }: t) =>
        startFrom === 0 && 'Has to start from a positive week',
    }}
    form={({ handleSubmit, submitting, pristine, invalid, field, ...rest }) => (
      <form className="ui form" onSubmit={handleSubmit}>
        {field('from', fieldProps => (
          <Input {...fieldProps} placeholder="dd-mm-yy" label="From" />
        ))}
        {field('to', fieldProps => (
          <Input {...fieldProps} placeholder="dd-mm-yy" label="To" />
        ))}
        {field('startFrom', fieldProps => (
          <NumberInput {...fieldProps} placeholder="Week to start from" />
        ))}

        <Button disabled={submitting || pristine || invalid}>Roll out!</Button>
      </form>
    )}
  />
);

const mapStateToProps = (state: RootState): StateProps => ({
  scheduleId: state.location.payload.scheduleId,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  async handleSubmit(formValues: t, scheduleId: number) {
    const from = moment(formValues.from, 'DD-MM-YY').format('DD-MM-YYYY');
    const to = moment(formValues.to, 'DD-MM-YY').format('DD-MM-YYYY');

    return dispatch(thunks.rollout(scheduleId, from, to, formValues.startFrom));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RolloutForm);
