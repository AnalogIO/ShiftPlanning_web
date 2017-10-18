import React from 'react';
import { Handlers } from 'react-formie';

type Props = {
  label?: string;
};

type InputProps = Props & Handlers<boolean> & React.HTMLProps<HTMLInputElement>;

export default ({
  error,
  label,
  touch,
  touched,
  update,
  value,
  ...props,
}: InputProps) => (
  <div className="field">
    <div className="ui checkbox">
      <input
        type="checkbox"
        checked={value}
        onChange={e => update(e.target.checked)}
        {...props}
      />
      <label>{label}</label>
    </div>
  </div>
);
