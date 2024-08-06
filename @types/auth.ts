import { UserCredential } from 'firebase/auth';

// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;
export type ManageBusiness = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  manageBusiness: ManageBusiness;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  manageBusiness: ManageBusiness;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirm_password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, email: string, password: string, confirm_password: string) => Promise<void>;
  changePassword: (password: string, new_password: string, confirm_new_password: string) => Promise<void>;
};

export type FirebaseContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'firebase';
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

export type AWSCognitoContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'cognito';
  login: (email: string, password: string) => Promise<unknown>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<unknown>;
  logout: VoidFunction;
};

export type Auth0ContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'auth0';
  login: () => Promise<void>;
  logout: VoidFunction;
};
