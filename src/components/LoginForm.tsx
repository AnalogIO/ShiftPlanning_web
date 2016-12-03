import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class LoginForm extends Component<any, {}> {
  onSubmit = (e: any) => {
    e.preventDefault();

    const refs = this.refs as any;
    const email = refs.email.value as string;
    const password = refs.password.value as string;

    this.props.onSubmit(email, password);
  }

  render() {
    const errors = this.props.errors.map((error: string, i: number) => {
      return <li key={i}>{error}</li>
    });

    const loading = this.props.loading ? 'is-loading' : '';

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <form onSubmit={this.onSubmit}>
              <label className="label">Email</label>
              <p className="control">
                <input autoFocus className="input" type="text" ref="email" />
              </p>
              <label className="label">Password</label>
              <p className="control">
                <input className="input" type="password" ref="password" />
              </p>

              <p className="control">
                <button className={`button is-primary ${loading}`}>Log in</button>
              </p>

              <ul>
                {errors}
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
