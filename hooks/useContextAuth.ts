import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
export const useContextAuth = () => {
    const props = useContext(AuthContext)

    return { ...props }
}