declare var moment: any;

function getParameterByName(name: string, url?: string): string {
  if (!url) {
    url = window.location.href;
  }

  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

import { IEmployee } from '../stores';

const { Link } = require('react-router');
const ReactTags = require('react-tag-input').WithContext;

@inject('stores') @observer
export default class UpdateShift extends Component<any, any> {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    employees: this.props.shift.employees.map((e: any) => {
      return {
        id: e.id,
        text: `${e.firstName} ${e.lastName} (${e.id})`,
      };
    }) as any[],
    suggestions: this.props.employees.map((e: IEmployee) => `${e.firstName} ${e.lastName} (${e.id})`) as string[],
    updated: false,
  };

  handleUpdateShift = async (e: any) => {
    e.preventDefault();

    const { EmployeeStore } = this.props.stores;

    const { shift } = this.props;
    const { start, end } = shift;
    const startTime = shift.startTime || moment(shift.start).format('HH:mm');
    const endTime = shift.endTime || moment(shift.end).format('HH:mm');

    const offset = moment().utcOffset() / 60;
    const sd = moment(moment(shift.start).format('YYYY-DD-MM ') + startTime + moment().format(' ZZ'), 'YYYY-DD-MM HH:mm ZZ');
    const ed = moment(moment(shift.end).format('YYYY-DD-MM ') + endTime + moment().format(' ZZ'), 'YYYY-DD-MM HH:mm ZZ');
    const employeeIds = this.state.employees.map(e => e.id);
    const es = await EmployeeStore.getEmployees();
    const employees = employeeIds.map(id => _.find(es, (e: any) => e.id == id));

    this.updateProperty('start', sd.toISOString());
    this.updateProperty('end', ed.toISOString());
    this.updateProperty('employeeIds', employeeIds);
    this.updateProperty('employees', employees);

    await this.props.handleUpdateShift(shift);
    this.setState({
      updated: true,
    });
  }

  handleDeleteShift = async (e: any) => {
    e.preventDefault();

    if (!confirm('Are you sure?')) {
      return;
    }

    const { shift } = this.props;

    await this.props.handleDeleteShift(shift)
    this.context.router.transitionTo('/shifts');
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
    const { shift } = this.props;
    const { employees, suggestions } = this.state;

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Updating shift {moment(shift.start).format('YYYY-MM-DD')}</p>
            <Link to="/shifts" className="delete"></Link>
          </header>
          <section className="modal-card-body">
            <div className="control is-horizontal">
              <div className="control-label"><label className="label">From:</label></div>
              <div className="control">
                <input className="input" type="text" name="startTime" defaultValue={moment(shift.start).format('HH:mm')} onChange={this.onChange} />
              </div>
            </div>

            <div className="control is-horizontal">
              <div className="control-label"><label className="label">To:</label></div>
              <div className="control">
                <input className="input" type="text" name="endTime" defaultValue={moment(shift.end).format('HH:mm')} onChange={this.onChange} />
              </div>
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
            <a onClick={this.handleUpdateShift} className="button is-primary">Update shift</a>
            <a onClick={this.handleDeleteShift} className="button is-danger">Delete shift</a>
            <Link to="/shifts" className="button">Cancel</Link>
            <div>{this.state.updated ? 'The shift has been updated!' : ''}</div>
          </footer>
        </div>
      </div>
    );
  }
}
