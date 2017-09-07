import cn from 'classnames';
import React from 'react';
import Link from 'redux-first-router-link';

type Props = {
  children: any;
  to: string;
  className?: string;
  loading?: boolean;
  theme?: string;
  disabled?: boolean;
  primary?: boolean;
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
  negative,
  fluid,
  large,
  ...props,
}: Props) => {
  const classes = cn('ui button', className, theme, {
    disabled,
    loading,
    primary,
    basic,
    negative,
    fluid,
    large,
  });

  return (
    <Link className={classes} {...props}>
      {props.children}
    </Link>
  );
};
