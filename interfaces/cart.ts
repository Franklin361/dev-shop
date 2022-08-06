import { ISize } from "./product";

export interface ICartProduct {
    quantity: number
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex'
    _id: string;
}

export interface InfoAddress {
    name: string
    lastName: string
    address: string
    address2?: string
    zip: string
    phone: string
    country: string
    city: string
}
