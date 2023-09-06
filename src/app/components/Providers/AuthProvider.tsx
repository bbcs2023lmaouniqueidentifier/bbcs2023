export interface User {
  user_id: number;
  username: string;
  email: string;
  hours: number;
  mbti: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

//MBTI values must add up to 1

export const testUser: User = {
  user_id: 0,
  username: 'john tan',
  email: 'fuckyou@gmail.com',
  hours: 6920123,
  mbti: {
    E: 0.5,
    I: 0.5,
    S: 0.8,
    N: 0.2,
    T: 0.9,
    F: 0.1,
    J: 0.51,
    P: 0.49,
  },
};
