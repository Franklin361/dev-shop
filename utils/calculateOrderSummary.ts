import { ICartProduct } from "../interfaces"

export const calculateOrderSummary = (cart: ICartProduct[]) => {

    const numberOfItems = cart.reduce((prev, current) => current.quantity + prev, 0)
    const subtotal = cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_RATE) || 0
    const tax = subtotal * +taxRate
    const total = subtotal * (+taxRate + 1)

    return {
        numberOfItems,
        subtotal,
        taxRate,
        tax,
        total
    }
}