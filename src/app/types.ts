import React, { ForwardRefExoticComponent } from 'react';

export interface JSXProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export interface AccountDetails {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}
