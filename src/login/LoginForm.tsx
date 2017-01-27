import React, { Component } from 'react';

import Formie from 'react-formie';
import { Email, Password } from 'shared/fields';

import Button from 'shared/Button';

interface Props {
  invalid: boolean;
  submitting: boolean;
  handleSubmit: any;
}

export default class extends Component<Props, {}> {
  render() {
    return (
      <Formie
        initial={{ email: '', password: '' }}
        validate={{
          email: (v: string) => !/.+@.+/.test(v) && 'Invalid email',
          password: (v: string) => !v && 'Password required',
        }}
        onSubmit={this.props.handleSubmit}
        form={({ handleSubmit, field, submitting, invalid }) =>
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
                {field('email', props =>
                  <Email placeholder="Email" autoFocus hide {...props} />,
                )}
                {field('password', props =>
                  <Password placeholder="Password" hide {...props} />,
                )}

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
          </div>}
      />
    );
  }
}
