import { useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from "./"

import { Element, IUser } from "../../interfaces"
import { devShopApi } from "../../api"
import Cookie from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCartStore } from '../../store';
import { getDataFromCookies } from '../../utils';

export interface AuthState {
    isLoggedIn: boolean
    user?: IUser,


}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface IProps {
    children: Element
}

export const AuthProvider = ({ children }: IProps) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const { reload } = useRouter()

    // refer to cart ----
    const { addProductsFromStorage, addShippingAddress } = useCartStore(({ addProductsFromStorage, addShippingAddress }) => ({ addProductsFromStorage, addShippingAddress }))
    useEffect(() => {
        try {
            const cookie = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            addProductsFromStorage(cookie)
        } catch (err) {
            console.log(err)
            addProductsFromStorage([])
        }
    }, [])

    useEffect(() => {
        if (Cookie.get('name')) addShippingAddress(getDataFromCookies())
    }, [])


    // -----------------

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {

        if (!Cookie.get('token')) return;

        try {
            const { data } = await devShopApi.get('/user/validate-token')
            Cookie.set('token', data.token)
            dispatch({
                type: 'log-in',
                payload: data.user
            })
        } catch (error) {
            Cookie.remove('token')
        }
    }


    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await devShopApi.post('/user/login', { email, password })
            Cookie.set('token', data.token)

            dispatch({
                type: 'log-in',
                payload: data.user
            })
            return true
        } catch (error) {
            return false
        }
    }

    const registerUser = async (email: string, password: string, name: string): Promise<{ hasError: boolean, msg?: string }> => {
        try {
            const { data } = await devShopApi.post('/user/register', { email, password, name })
            Cookie.set('token', data.token)

            dispatch({
                type: 'log-in',
                payload: data.user
            })
            return {
                hasError: false
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    msg: (error.response?.data as any).msg
                }
            }

            return {
                hasError: true,
                msg: 'Failed to create user'
            }
        }
    }

    const logOut = () => {
        Cookie.remove('token')
        Cookie.remove('cart')
        reload()
    }


    return (
        <AuthContext.Provider
            value={{
                ...state,
                loginUser,
                logOut,
                registerUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
} 