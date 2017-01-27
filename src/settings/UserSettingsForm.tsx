import React, { Component } from 'react';

import { CurrentUser } from 'app/types';
import { Employee } from 'employees/types';
import Formie from 'react-formie';
import Button from 'shared/Button';
import { Input, NumberInput, Password } from 'shared/fields';

interface Props {
  user: CurrentUser;
  employees: Employee[];
}

export default class extends Component<Props, {}> {
  render() {
    const { user } = this.props;

    return (
      <Formie
        initial={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          ...user,
        }}
        onSubmit={console.log}
        validate={{
          confirmPassword: (v: string, values: any) =>
            v !== values.newPassword && 'Passwords are different',
        }}
        form={({ field, ...rest }) =>
          <form className="ui form">
            <h1>
              {user.firstName} {user.lastName}
            </h1>

            <div className="field">
              {field('email', props =>
                <Input {...props} placeholder="Email" />,
              )}
              {field('currentPassword', props =>
                <Password {...props} placeholder="Current password" />,
              )}
              {field('newPassword', props =>
                <Password {...props} placeholder="New password" />,
              )}
              {field('confirmPassword', props =>
                <Password {...props} placeholder="Confirm password" />,
              )}

              <hr />

              <h2>Schedule settings</h2>

              {field('wantShifts', props =>
                <NumberInput {...props} placeholder="Shifts wanted" />,
              )}

              <hr />

              <h2>Friends</h2>

              <Button>Submit</Button>
            </div>
          </form>}
      />
    );
  }
}
