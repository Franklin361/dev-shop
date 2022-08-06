import { AuthState } from ".";
import { IUser } from "../../interfaces";

type AuthAction = { type: 'log-in', payload: IUser } | { type: 'log-out' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'log-in': return {
            ...state,
            isLoggedIn: true,
            user: action.payload
        }

        case 'log-out': return {
            isLoggedIn: false,
            user: undefined
        }

        default: return state
    }
}