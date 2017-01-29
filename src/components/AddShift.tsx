declare var moment: any;

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { IEmployee } from '../stores';

const { Link } = require('react-router');
const ReactTags = require('react-tag-input').WithContext;

@observer
export default class AddShift extends Component<any, any> {
  state = {
    employees: [] as any[],
    suggestions: this.props.employees.map((e: IEmployee) => `${e.firstName} ${e.lastName} (${e.id})`) as string[],
    created: false,
  };

  handleNewShift = async (e: any) => {
    e.preventDefault();

    const { route, newShift } = this.props;
    const { year, month, day } = route.location.query;
    const date = moment([year, month - 1, day]);
    const { start, end } = newShift;
    const sd = moment(date.format('YYYY-DD-MM ') + start + date.format(' ZZ'), 'YYYY-DD-MM HH:mm ZZ');
    const ed = moment(date.format('YYYY-DD-MM ') + end + date.format(' ZZ'), 'YYYY-DD-MM HH:mm ZZ');
    const employeeIds = this.state.employees.map(e => e.id);

    await this.props.onSubmit({
      start: sd.toISOString(),
      end: ed.toISOString(),
      employeeIds,
    });

    this.setState({
      created: true,
    });
  }

  updateProperty = (key: string, value: any) => {
    this.props.newShift[key] = value;
  }

  onChange = (e: any) => {
    this.updateProperty(e.target.name, e.target.value);
  }

  handleDelete = (i: number) => {
    let { employees } = this.state;
    employees.splice(i, 1);
    this.setState({ employees });
  }

  handleAddition = (e: string) => {
    let { employees } = this.state;
    employees.push({
      id: parseInt(e.match(/\((\d+)\)/)[1]),
      text: e,
    });
  }

  handleFilterSuggestions = (inputValue: string, suggestions: string[]) => {
    const names = this.state.employees.map(e => e.text);
    inputValue = inputValue.trim().toLowerCase();
    suggestions = suggestions.filter(s => names.indexOf(s) === -1);

    return suggestions.filter(s => (
      suggestions.indexOf(s) !== -1 && s.toLowerCase().indexOf(inputValue) !== -1
    ));
  }

  render() {
    const { route, newShift } = this.props;
    const { year, month, day, hours, minutes } = route.location.query;
    const m = moment();
    let date = moment([year, month - 1, day]);

    if (hours) {
      date = moment([year, month - 1, day, hours, minutes]);
    }

    const { employees, suggestions } = this.state;

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Adding shift to {date.format('YYYY-MM-DD')}</p>
            <Link to="/shifts" className="delete"></Link>
          </header>
          <section className="modal-card-body">
            <div className="control is-horizontal">
              <div className="control-label"><label className="label">From:</label></div>
              <div className="control">{hours
                ? <input className="input" type="text" name="start" value={date.format('HH:mm')} onChange={this.onChange} />
                : <input className="input" type="text" placeholder="08:00" name="start" onChange={this.onChange} />
              }</div>
            </div>

            <div className="control is-horizontal">
              <div className="control-label"><label className="label">To:</label></div>
              <div className="control">{hours
                ? <input className="input" type="text" name="end" value={date.add(2, 'hours').format('HH:mm')} onChange={this.onChange} />
                : <input className="input" type="text" placeholder="10:00" name="end" onChange={this.onChange} />
              }</div>
            </div>

            <div className="control is-horizontal">
              <div className="control-label"><label className="label">Employees:</label></div>
              <ReactTags
                tags={employees}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleFilterSuggestions={this.handleFilterSuggestions}
                autocomplete={true}
                autoFocus={false}
                placeholder={"Employee's name"}
                classNames={{
                  tag: 'tag',
                  tags: 'ReactTags__tags control',
                  tagInputField: 'input',
                  remove: 'delete is-small hide',
                }}
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <a onClick={this.handleNewShift} className="button is-primary">Add shift</a>
            <Link to="/shifts" className="button">Cancel</Link>
            <div>{this.state.created ? 'The shift has been created!' : ''}</div>
          </footer>
        </div>
      </div>
    );
  }
}
