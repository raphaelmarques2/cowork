export type JwtTokenPayload = {
  username: string;
  sub: string;
};

export type AuthUser = {
  email: string;
  id: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: AuthUser;
    }
  }
}
