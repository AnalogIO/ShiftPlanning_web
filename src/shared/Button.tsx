import cn from 'classnames';
import React, { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  theme?: string;
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  negative?: boolean;
  basic?: boolean;
  fluid?: boolean;
  large?: boolean;
};

export default ({
  className,
  disabled,
  loading,
  theme,
  basic,
  primary,
  secondary,
  negative,
  fluid,
  large,
  ...props,
}: Props) => {
  const classes = cn('ui button', className, theme, {
    disabled,
    loading,
    primary,
    secondary,
    basic,
    negative,
    fluid,
    large,
  });

  return <button className={classes} {...props} />;
};
