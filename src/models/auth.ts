export interface AuthLogin {
  username: string;
  password: string;
}
export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface DecodedToken {
  userId: number;
  authorities: string[];
  exp: number;
  iat: number;
  sub: string;
}
