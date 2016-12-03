import React, { Component } from 'react';
import { observable, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';

import LoginForm from 'components/LoginForm';

@inject('stores') @observer
export default class LoginContainer extends Component<any, {}> {
  @observable errors: string[] = [];
  @observable loading = false;

  onSubmit = async (email: string, password: string) => {
    const { AuthStore } = this.props.stores;

    try {
      this.loading = true;
      await AuthStore.login(email, password);
      this.errors = [];
      this.loading = false;
    } catch(e) {
      console.error(e);
      this.errors = [e.response.data.message];
      this.loading = false;
    }
  }

  render() {
    return (
      <LoginForm
        errors={this.errors}
        loading={this.loading}
        onSubmit={this.onSubmit}
      />
    );
  }
}
