import React, { Component } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class NewEmployeeForm extends Component<any, {}> {
  onSubmit = (e: any) => {
    e.preventDefault();

    const { newEmployee } = this.props;
    const { email, firstName, lastName, employeeTitleId, profilePhoto } = newEmployee;

    newEmployee.email = email || '';
    newEmployee.firstName = firstName || '';
    newEmployee.lastName = lastName || '';
    newEmployee.employeeTitleId = parseInt(employeeTitleId || this.props.titles[0].id);
    newEmployee.profilePhoto = profilePhoto || '';

    this.props.onSubmit(newEmployee);
  }

  updateProperty = (key: string, value: any) => {
    this.props.newEmployee[key] = value;
  }

  onChange = (e: any) => {
    this.updateProperty(e.target.name, e.target.value);
  }

  profilePhoto = (e: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load', () => {
      this.props.newEmployee.profilePhoto = reader.result;
    });
  }

  render() {
    const { newEmployee } = this.props;
    const { firstName, lastName, employeeTitleId, email } = newEmployee;

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
                {this.props.titles.map(({ title, id }: any) => (
                  <option key={id} value={id}>{title}</option>
                ))}
              </select>
            </span>
          </p>

          <label className="label">Profile photo:</label>
          <p className="control">
            <input type="file" onChange={this.profilePhoto} />
          </p>

          <p className="control">
            <button className="button is-primary">Create employee</button>
          </p>
        </form>
      </div>
    );
  }
}
