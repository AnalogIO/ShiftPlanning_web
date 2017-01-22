import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const { Link } = require('react-router');

@observer
export default class RolloutForm extends Component<any, {}> {
  state = {
    rollingOut: false,
    rolledOut: false,
  }

  onSubmit = async (e: any) => {
    e.preventDefault();

    const refs = this.refs as any;
    const from = refs.from.value as string;
    const to = refs.to.value as string;

    this.setState({
      rollingOut: true,
    });
    await this.props.onSubmit({ from, to });
    this.setState({
      rolledOut: true,
      rollingOut: false,
    });
  }

  render() {
    const { id } = this.props.route.params;

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <form onSubmit={this.onSubmit}>
              <label className="label">From</label>
              <p className="control">
                <input autoFocus className="input" type="text" ref="from" placeholder="dd-mm-yyyy" />
              </p>
              <label className="label">To</label>
              <p className="control">
                <input className="input" type="text" ref="to" placeholder="dd-mm-yyyy" />
              </p>

              <div className="control is-grouped">
                <p className="control">
                  <button className={`button is-primary ${this.state.rollingOut ? 'is-loading' : ''}`}>Rollout</button>
                </p>
                <p className="control">
                  <Link to={`/schedules/${id}`} className="button">Cancel</Link>
                </p>
              </div>

              <div>{this.state.rolledOut ? 'Your schedule has been rolled out!' : ''}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
