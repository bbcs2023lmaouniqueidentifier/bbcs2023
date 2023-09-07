import { MBTI } from "@/app/types";
export interface User {
  username: string;
  email: string;
  hours: number;
  mbti: MBTI;
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
