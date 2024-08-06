import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from '@/_global/utils/axios';
import { isValidToken, setSession } from '@/_global/utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, ManageBusiness, JWTContextType } from '@/_global/@types/auth';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  ForgetPassword = 'ForgetPassword',
  ResetPassword = 'ResetPassword',
  ChangePassword = 'ChangePassword',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
    manageBusiness: ManageBusiness;
  };
  [Types.Login]: {
    user: AuthUser;
    manageBusiness: ManageBusiness;
  };
  [Types.Logout]: undefined;
  [Types.ForgetPassword]: undefined;
  [Types.ResetPassword]: undefined;
  [Types.ChangePassword]: undefined;
  [Types.Register]: {
    user: AuthUser;
    manageBusiness: ManageBusiness;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  manageBusiness: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        manageBusiness: action.payload.manageBusiness,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        manageBusiness: action.payload.manageBusiness,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        manageBusiness: null,
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        manageBusiness: action.payload.manageBusiness,
      };
    case 'ForgetPassword':
      return state;
    case 'ResetPassword':
      return state;
    case 'ChangePassword':
      return state;

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/auth/user');
          const data = response.data.data;
          const user = data.user;
          const manageBusiness = data.manage_business;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
              manageBusiness
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
              manageBusiness: null
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
            manageBusiness: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/login', {
      email,
      password,
    });
    const { access_token, user, manage_business } = response.data.data;

    setSession(access_token);

    dispatch({
      type: Types.Login,
      payload: {
        user,
        manageBusiness: manage_business
      },
    });
  };

  const register = async (email: string, password: string, confirm_password: string, name: string) => {
    const response = await axios.post('/api/register', {
      email,
      password,
      confirm_password,
      name: name,
    });
    const { access_token, user, manage_business } = response.data.data;

    localStorage.setItem('accessToken', access_token);

    dispatch({
      type: Types.Register,
      payload: {
        user,
        manageBusiness: manage_business
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  const forgetPassword = async (email: string) => {
    const response = await axios.post('/api/forget-password', {
      email,
    });
    dispatch({ type: Types.ForgetPassword });
  };

  const resetPassword = async (token: string, email: string, password: string, confirm_password: string) => {
    const response = await axios.post('/api/reset-password', {
      token,
      email,
      password,
      confirm_password
    });
    dispatch({ type: Types.ResetPassword });
  };

  const changePassword = async (password: string, new_password: string, confirm_new_password: string) => {
    const response = await axios.post('/api/change-password', {
      password,
      new_password,
      confirm_new_password
    });
    dispatch({ type: Types.ChangePassword });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        forgetPassword,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
