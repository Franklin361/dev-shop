import { useReducer, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

import { AuthContext, authReducer } from './';

import { devShopApi } from '../../services';
import { useLoadedDataFromCookie } from '../../hooks';

import { Element, IUser } from '../../interfaces';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface IProps {
  children: Element;
}

export const AuthProvider = ({ children }: IProps) => {
  useLoadedDataFromCookie();

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { reload } = useRouter();

  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated')
      dispatch({ type: 'log-in', payload: data.user as IUser });
  }, [status, data]);

  // useEffect(() => {
  //     checkToken()
  // }, [])

  const checkToken = async () => {
    if (!Cookie.get('token')) return;

    try {
      const { data } = await devShopApi.get('/user/validate-token');
      Cookie.set('token', data.token);
      dispatch({
        type: 'log-in',
        payload: data.user,
      });
    } catch (error) {
      Cookie.remove('token');
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await devShopApi.post('/user/login', {
        email,
        password,
      });
      Cookie.set('token', data.token);

      dispatch({
        type: 'log-in',
        payload: data.user,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ hasError: boolean; msg?: string }> => {
    try {
      const { data } = await devShopApi.post('/user/register', {
        email,
        password,
        name,
      });
      Cookie.set('token', data.token);

      dispatch({
        type: 'log-in',
        payload: data.user,
      });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          msg: (error.response?.data as any).msg,
        };
      }

      return {
        hasError: true,
        msg: 'Failed to create user',
      };
    }
  };

  const logOut = () => {
    Cookie.remove('cart');
    Cookie.remove('name');
    Cookie.remove('lastName');
    Cookie.remove('address');
    Cookie.remove('address2');
    Cookie.remove('zip');
    Cookie.remove('phone');
    Cookie.remove('country');
    Cookie.remove('city');
    signOut();
    // Cookie.remove('token')
    // reload()
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        logOut,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
