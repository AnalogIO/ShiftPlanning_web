import React, { Component } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class NewScheduleForm extends Component<any, {}> {
  state = {
    updated: false,
  }

  onSubmit = async (e: any) => {
    e.preventDefault();

    const { newSchedule } = this.props;

    await this.props.onSubmit(newSchedule);

    this.setState({
      updated: true,
    });
  }

  updateProperty = (key: string, value: any) => {
    this.props.newSchedule[key] = value;
  }

  onChange = (e: any) => {
    this.updateProperty(e.target.name, e.target.value);
  }

  render() {
    const { newSchedule } = this.props;
    const { name, numberOfWeeks } = newSchedule;

    return (
      <div className="box">
        <form onSubmit={this.onSubmit}>
          <label className="label">Name:</label>
          <p className="control">
            <input className="input" autoFocus type="input" name="name" value={name} onChange={this.onChange} />
          </p>

          <label className="label">Number of weeks:</label>
          <p className="control">
            <input className="input" type="text" name="numberOfWeeks" value={numberOfWeeks} onChange={this.onChange} />
          </p>

          <p className="control">
            <button className="button is-primary">Create schedule</button>
          </p>

          <div>{this.state.updated ? 'A new schedule created!' : ''}</div>
        </form>
      </div>
    );
  }
}
