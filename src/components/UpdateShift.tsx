import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Employee } from '../stores';

const { Link } = require('react-router');
const ReactTags = require('react-tag-input').WithContext;

enum Weekday {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

@observer
export default class UpdateShift extends Component<any, any> {
  state = {
    employees: this.props.shift.employees.map((e: any) => {
      return {
        id: e.id,
        text: `${e.firstName} ${e.lastName} (${e.id})`,
      };
    }) as any[],
    suggestions: this.props.employees.map((e: Employee) => `${e.firstName} ${e.lastName} (${e.id})`) as string[],
  };

  handleUpdateShift = (e: any) => {
    e.preventDefault();

    const { shift, route } = this.props;
    const { params } = route;

    const { day, week } = params;
    const employeeIds = this.state.employees.map(e => e.id);

    shift.day = (parseInt(week) - 1) * 7 + parseInt(day);
    shift.employeeIds = employeeIds;
    delete shift.employees;

    this.props.handleUpdateShift(shift);
  }

  handleDeleteShift = (e: any) => {
    e.preventDefault();

    if (!confirm('Are you sure?')) {
      return;
    }

    const { shift } = this.props;

    this.props.handleDeleteShift(shift);
  }

  updateProperty = (key: string, value: any) => {
    this.props.shift[key] = value;
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
    const { shift, route } = this.props;
    const { id, week, day } = route.params;
    const { employees, suggestions } = this.state;

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Update schedule shift {Weekday[day]} Week {week}</p>
            <Link to={`/schedules/${id}`} className="delete"></Link>
          </header>
          <section className="modal-card-body">
            <div className="control is-horizontal">
              <div className="control-label"><label className="label">From:</label></div>
              <div className="control"><input className="input" type="text" value={shift.start} name="start" onChange={this.onChange} /></div>
            </div>

            <div className="control is-horizontal">
              <div className="control-label"><label className="label">To:</label></div>
              <div className="control"><input className="input" type="text" value={shift.end} name="end" onChange={this.onChange} /></div>
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
            <a onClick={this.handleUpdateShift} className="button is-primary">Update schedule shift</a>
            <a onClick={this.handleDeleteShift} className="button is-danger">Delete schedule shift</a>
            <Link to={`/schedules/${id}`} className="button">Cancel</Link>
          </footer>
        </div>
      </div>
    );
  }
}
