import React from 'react';

import Formie from 'react-formie';
import { Email, Password } from 'shared/fields';

import Button from 'shared/Button';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  handleSubmit: (values: FormValues) => Promise<void>;
}

export default (props: Props) => (
  <Formie
    initial={{ email: '', password: '' } as FormValues}
    validate={{
      email: (v: string) => !/.+@.+/.test(v) && 'Invalid email',
      password: (v: string) => !v && 'Password required',
    }}
    onSubmit={props.handleSubmit}
    form={({ handleSubmit, field, submitting, invalid }) => (
      <div
        className="ui middle aligned center aligned grid"
        style={{ height: '80%' }}
      >
        <div className="column" style={{ maxWidth: '450px' }}>
          <h1 className="ui header">
            <img
              className="ui image"
              src={require('shared/images/logo.png')}
              alt="Logo"
              style={{
                width: '1.5em',
                marginTop: '-.2em',
              }}
            />
            ShiftPlanning
          </h1>
          <form className="ui large form" onSubmit={handleSubmit}>
            {field('email', fieldProps => (
              <Email placeholder="Email" autoFocus hide {...fieldProps} />
            ))}
            {field('password', fieldProps => (
              <Password placeholder="Password" hide {...fieldProps} />
            ))}

            <Button
              disabled={submitting || invalid}
              loading={submitting}
              fluid
              large
              primary
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    )}
  />
);
