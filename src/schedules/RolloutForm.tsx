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

type FormValues = { from: string; to: string; startFrom: number };

interface StateProps {
  scheduleId: number;
}

interface DispatchProps {
  handleSubmit: (values: FormValues, scheduleId: number) => void;
}

const RolloutForm = (props: StateProps & DispatchProps) =>
  <Formie
    initial={{ from: '', to: '', startFrom: 1 } as FormValues}
    onSubmit={(values: FormValues) =>
      props.handleSubmit(values, props.scheduleId)}
    validate={{
      from: (v: string) =>
        !/\d\d-\d\d-\d\d/.test(v) && 'Date looks wrongly formatted',
      to: (v: string) =>
        !/\d\d-\d\d-\d\d/.test(v) && 'Date looks wrongly formatted',
      startFrom: (v: number) => v === 0 && 'Has to start from a positive week',
    }}
    form={({ handleSubmit, submitting, pristine, invalid, field, ...rest }) =>
      <form className="ui form" onSubmit={handleSubmit}>
        {field('from', fieldProps =>
          <Input {...fieldProps} placeholder="dd-mm-yy" label="From" />,
        )}
        {field('to', fieldProps =>
          <Input {...fieldProps} placeholder="dd-mm-yy" label="To" />,
        )}
        {field('startFrom', fieldProps =>
          <NumberInput {...fieldProps} placeholder="Week to start from" />,
        )}

        <Button disabled={submitting || pristine || invalid}>Roll out!</Button>
      </form>}
  />;

const mapStateToProps = (state: RootState): StateProps => ({
  scheduleId: selectors.getScheduleById(
    state,
    state.location.payload.scheduleId,
  ),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  async handleSubmit(formValues: FormValues, scheduleId: number) {
    const from = moment(formValues.from, 'DD-MM-YY').format('DD-MM-YYYY');
    const to = moment(formValues.to, 'DD-MM-YY').format('DD-MM-YYYY');

    return dispatch(thunks.rollout(scheduleId, from, to, formValues.startFrom));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RolloutForm);
