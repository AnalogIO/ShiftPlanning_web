import React from 'react';

import Formie from 'react-formie';
import { Email, Password } from 'shared/fields';

import Button from 'shared/Button';

const initial = { email: '', password: '' };

interface Props {
  handleSubmit: (values: typeof initial) => Promise<void>;
}

export default (props: Props) => (
  <Formie
    initial={initial}
    validate={{
      email: ({ email }: typeof initial) =>
        !/.+@.+/.test(email) && 'Invalid email',
      password: ({ password }: typeof initial) =>
        !password && 'Password required',
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
