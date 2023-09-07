export interface User {
  username: string;
  email: string;
  hours: number;
  mbti: {
    E: boolean;
    I: boolean;
    S: boolean;
    N: boolean;
    T: boolean;
    F: boolean;
    J: boolean;
    P: boolean;
  };
}

//MBTI values must add up to 1

export const testUser: User = {
  username: 'john tan',
  email: 'fuckyou@gmail.com',
  hours: 6920123,
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
