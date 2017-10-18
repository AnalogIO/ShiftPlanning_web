import React from 'react';
import { Handlers } from 'react-formie';

export type Props = {
  placeholder?: string;
  hideLabel?: boolean;
  hide?: boolean;
  label?: string;
  options: { id: number; title: string }[];
};

export type InputProps = Props &
  Handlers<number> &
  React.HTMLProps<HTMLSelectElement>;

export default ({
  touched,
  touch,
  error,
  value,
  update,
  hideLabel,
  hide,
  label,
  options,
  ...props,
}: InputProps) => (
  <div className="field">
    <label>{hide || hideLabel || label || props.placeholder}</label>
    <select
      {...props}
      className="ui selection dropdown"
      onBlur={touch}
      value={value}
      onChange={e => update(Number(e.target.value))}
    >
      {options.map(o => (
        <option key={o.id} value={o.id}>
          {o.title}
        </option>
      ))}
    </select>
    {hide ||
      (touched && error && <div style={{ color: '#888888' }}>{error}</div>)}
  </div>
);
