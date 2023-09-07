'use client';
import { MBTI, MBTIKeys } from '@/app/types';
import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { AccountDetails } from '../../types';
import {
  authorise,
  emailChange,
  passwordChange,
  registerAccount,
} from '@/app/api/auth';

export interface User {
  username: string;
  email: string;
  hours: number;
  mbti: MBTI;
}

export interface UserLocalstorage {
  data: User;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    loginDetails: Omit<AccountDetails, 'email' | 'repeat_password'>,
  ) => Promise<number>;
  logout: () => void;
  changeemail: (
    details: Omit<AccountDetails, 'email' | 'repeat_password'> & {
      newemail: string;
    },
  ) => Promise<void>;
  changepw: (
    details: Omit<AccountDetails, 'email' | 'repeat_password'> & {
      newpassword: string;
    },
  ) => Promise<void>;
  registerUserAccount: (accountDetails: AccountDetails) => Promise<number>;
}

//MBTI values must add up to 1

export const testUser: User = {
  username: 'john tan',
  email: 'fuckyou@gmail.com',
  hours: 12,
  mbti: {
    E: true,
    I: false,
    S: false,
    N: true,
    T: true,
    F: false,
    J: true,
    P: false,
  },
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => 0,
  logout: () => {},
  changeemail: async () => {},
  changepw: async () => {},
  registerUserAccount: async () => 0,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (formData: Omit<AccountDetails, 'email' | 'repeat_password'>) => {
      try {
        const {
          username,
          email,
          hours,
          mbti,
        }: { username: string; email: string; hours: number; mbti: string } =
          await authorise(formData);
        const resMBTI: MBTI = {
          E: false,
          I: false,
          S: false,
          N: false,
          T: false,
          F: false,
          J: false,
          P: false,
        };
        for (let char of mbti.split('')) {
          resMBTI[char as MBTIKeys] = true;
        }

        const res: User = { username, email, hours, mbti: resMBTI };
        setUser(res);
        localStorage.setItem('user', JSON.stringify(res));
        return 200;
      } catch (error) {
        console.error(error);
        return 500;
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const changeemail = useCallback(
    async (
      details: Omit<AccountDetails, 'email' | 'repeat_password'> & {
        newemail: string;
      },
    ) => {
      if (!user) throw new Error('User not logged in');
      try {
        await emailChange({ ...details, username: user.username });
        const updatedUser = { ...user, email: details.newemail };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const changepw = useCallback(
    async (
      details: Omit<AccountDetails, 'email' | 'repeat_password'> & {
        newpassword: string;
      },
    ) => {
      if (!user) throw new Error('User not logged in');
      try {
        await passwordChange({
          ...user,
          newpassword: details.newpassword,
          password: details.password,
        });
      } catch (error) {
        throw error;
      }
    },
    [],
  );
  const registerUserAccount = useCallback(
    async (accountDetails: AccountDetails): Promise<number> => {
      try {
        const {
          username,
          email,
          hours,
          mbti,
        }: { username: string; email: string; hours: number; mbti: string } =
          await registerAccount(accountDetails);
        const resMBTI: MBTI = {
          E: false,
          I: false,
          S: false,
          N: false,
          T: false,
          F: false,
          J: false,
          P: false,
        };
        for (let char of mbti.split('')) {
          resMBTI[char as MBTIKeys] = true;
        }

        const res: User = { username, email, hours, mbti: resMBTI };
        setUser(res);
        localStorage.setItem('user', JSON.stringify(res));

        return 200;
      } catch (error) {
        console.error(error);
      }
      return 500;
    },
    [],
  );

  const providerValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      changeemail,
      changepw,
      registerUserAccount,
    }),
    [
      user,
      isLoading,
      login,
      logout,
      changeemail,
      changepw,
      registerUserAccount,
    ],
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  );
};
