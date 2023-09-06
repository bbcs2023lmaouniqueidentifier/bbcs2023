import React, { ForwardRefExoticComponent } from 'react';

export type MBTI = {
  E: boolean;
  I: boolean;
  S: boolean;
  N: boolean;
  T: boolean;
  F: boolean;
  J: boolean;
  P: boolean;
};

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

export interface Opportunity {
  logo: File;
  title: string;
  description: string;
  mbti: MBTI;
}
