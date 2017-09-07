import React from 'react';
import { Handlers } from 'react-formie';

export type Props = {
  placeholder?: string;
  type?: string;
  hideLabel?: boolean;
  hide?: boolean;
  label?: string;
};

export type InputProps = Props &
  Handlers<string> &
  React.HTMLProps<HTMLInputElement>;

export default ({
  touched,
  touch,
  error,
  value,
  update,
  type = 'text',
  hideLabel,
  hide,
  label,
  ...props,
}: InputProps) =>
  <div className="field">
    <label>
      {hide || hideLabel || label || props.placeholder}
      <input
        type={type}
        onBlur={touch}
        value={value}
        onChange={e => update(e.target.value)}
        {...props}
      />
    </label>
    {hide ||
      (touched &&
        error &&
        <div style={{ color: '#888888' }}>
          {error}
        </div>)}
  </div>;
