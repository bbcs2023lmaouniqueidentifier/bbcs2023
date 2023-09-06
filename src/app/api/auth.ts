import { AccountDetails } from '@/app/types';

export const registerAccount = async (
  form: Omit<AccountDetails, 'repeat_password'>,
) => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  return resp.status == 200;
};

export const authorise = async (
  form: Omit<AccountDetails, 'email' | 'repeat_password'>,
) => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  return resp.status == 200;
};

export const emailChange = async (
  form: Omit<AccountDetails, 'email' | 'repeat_password'> & {
    newemail: string;
  },
) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/emailchange`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    },
  );
  return resp.status == 200;
};

export const passwordChange = async (
  form: Omit<AccountDetails, 'email' | 'repeat_password'> & {
    newpassword: string;
  },
) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/passwordchange`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    },
  );
  return resp.status == 200;
};
