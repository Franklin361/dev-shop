import { useEffect } from 'react';
import { useCartStore } from '../store';

import Cookie from 'js-cookie'

export const useGetCartCookie = () => {
    const addProductsFromStorage = useCartStore(state => state.addProductsFromStorage)

    useEffect(() => {
        try {
            const cookie = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            addProductsFromStorage(cookie)
        } catch (err) {
            console.log(err)
            addProductsFromStorage([])
        }
    }, [])

}