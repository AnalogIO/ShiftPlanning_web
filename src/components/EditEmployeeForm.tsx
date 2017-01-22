import React, { Component } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class EditEmployeeForm extends Component<any, {}> {
  state = {
    updated: false,
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.props.onSubmit(this.props.employee);
  }

  onDelete = (e: any) => {
    e.preventDefault();
    this.props.onDelete(this.props.employee);
  }

  updateProperty = (key: string, value: any) => {
    this.props.employee[key] = value;
  }

  onClick = (e: any) => {
    this.updateProperty(e.target.name, e.target.checked);
  }

  onChange = (e: any) => {
    this.updateProperty(e.target.name, e.target.value);
  }

  profilePhoto = (e: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load', () => {
      this.props.employee.profilePhoto = reader.result;
    });
  }

  render() {
    const { employee, titles } = this.props;
    const { firstName, lastName, employeeTitleId, email, active } = employee;

    return (
      <div className="box">
        <form onSubmit={this.onSubmit}>
          <label className="label">Email:</label>
          <p className="control">
            <input className="input" autoFocus type="input" name="email" value={email} onChange={this.onChange} />
          </p>

          <label className="label">First name:</label>
          <p className="control">
            <input className="input" type="text" name="firstName" value={firstName} onChange={this.onChange} />
          </p>

          <label className="label">Last name:</label>
          <p className="control">
            <input className="input" type="text" name="lastName" value={lastName} onChange={this.onChange} />
          </p>

          <label className="label">Barista title:</label>
          <p className="control">
            <span className="select">
              <select name="employeeTitleId" value={employeeTitleId} onChange={this.onChange}>
                {titles.map(({ title, id }: any) => (
                  <option key={id} value={id}>{title}</option>
                ))}
              </select>
            </span>
          </p>

          <label className="label">Active:</label>
          <p className="control">
            <input type="checkbox" name="active" checked={active} onChange={this.onClick} />
          </p>

          <label className="label">Profile photo:</label>
          <p className="control">
            <input type="file" onChange={this.profilePhoto} />
          </p>

          <div className="control is-grouped">
            <p className="control">
              <button className="button is-primary">Update employee</button>
            </p>
            <p className="control">
              <button
                className="button is-danger"
                onClick={this.onDelete}
              >
                Delete employee
              </button>
            </p>
          </div>

          <div>{this.state.updated ? 'Employee has been updated!' : ''}</div>
        </form>
      </div>
    );
  }
}
