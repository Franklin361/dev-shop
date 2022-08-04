import create from 'zustand'
import Cookie from 'js-cookie'

import { calculateOrderSummary } from '../utils'

import { ICartProduct, ISize } from '../interfaces'


interface CartState {
    numberOfItems: number
    subtotal: number
    taxRate: number
    tax: number
    total: number
    cart: ICartProduct[]
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    addProductsFromStorage: (products: ICartProduct[]) => void
    deleteProductFromCart: (id: string, size: ISize) => void
}

export const useCartStore = create<CartState>(set => ({

    numberOfItems: 0,
    subtotal: 0,
    taxRate: 0,
    tax: 0,
    total: 0,
    cart: [],

    addProductToCart: (product: ICartProduct) => set(state => {

        const existProductWithSize = state.cart.some(item => item._id === product._id && item.size === product.size)

        if (!existProductWithSize) {
            let cart = [product, ...state.cart]
            Cookie.set('cart', JSON.stringify(cart))
            return { ...state, cart, ...calculateOrderSummary(cart) }
        }

        const updateCart = state.cart.map(item => {
            if (item._id !== product._id) return item
            if (item.size !== product.size) return item

            item.quantity += product.quantity

            return item
        })

        Cookie.set('cart', JSON.stringify(updateCart))

        return {
            ...state,
            cart: updateCart,
            ...calculateOrderSummary(updateCart)
        }
    }),

    deleteProductFromCart: (id: string, size: ISize) => set(state => {

        const newCart = state.cart.map(item => {
            if (item._id === id && item.size === size) return false
            return item
        }).filter(Boolean)

        Cookie.set('cart', JSON.stringify(newCart))
        return { ...state, cart: newCart as ICartProduct[], ...calculateOrderSummary(newCart as ICartProduct[]) }
    }),

    addProductsFromStorage: (products: ICartProduct[]) => set(state => ({ ...state, cart: products, ...calculateOrderSummary(products) })),

    updateCartQuantity: (product: ICartProduct) => set(state => {
        const cart = state.cart.map(item => {
            if (product._id !== item._id) return item
            if (product.size !== item.size) return item

            return product
        })
        Cookie.set('cart', JSON.stringify(cart))
        return { ...state, cart, ...calculateOrderSummary(cart) }
    }),
}))

