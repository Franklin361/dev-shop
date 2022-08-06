import { createContext } from "react";
import { IUser } from "../../interfaces";

interface IAuthContext {
    isLoggedIn: boolean
    user?: IUser,
    loginUser: (email: string, password: string) => Promise<boolean>
    registerUser: (email: string, password: string, name: string) => Promise<{
        hasError: boolean;
        msg?: string;
    }>
}

export const AuthContext = createContext({} as IAuthContext)

