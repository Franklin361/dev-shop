import { useEffect } from 'react';
import Cookie from 'js-cookie';

import { useCartStore } from '../store';

import { getDataFromCookies } from '../utils';

export const useLoadedDataFromCookie = () => {

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

}