import { User } from '@prisma/client';

export type JwtTokenPayload = {
  username: string;
  sub: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
