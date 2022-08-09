import { IUser } from "./user"
import { InfoAddress } from './cart';
import { ISize } from "./product";

export interface IOrder {
    _id?: string
    user?: IUser | string
    orderItems: IOrderItem[]
    shippingAddress: InfoAddress
    paymentResult?: string

    numberOfItems: number
    subtotal: number
    tax: number
    total: number

    isPaid: boolean
    paidAt?: string
    transactionId?: string


    createdAt?: string;
    updatedAt?: string;
}

export interface IOrderItem {
    _id: string
    title: string
    size: ISize
    quantity: number
    slug: string
    image: string
    price: number
}