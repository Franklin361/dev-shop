import { IconBaseProps } from "react-icons"

export type Element = JSX.Element | JSX.Element[]

export interface ILayoutShop {
    title?: string
    pageDesc?: string
    imgUrl?: string
}

export type NameIcon = 'men' | 'women' |
    'kid' | 'search' | 'cart' | 'menu' | 'plus' |
    'less' | 'close' | 'delete' | 'credit' | 'log-in'
    | 'log-out' | 'profile' | 'order' | 'products' | 'users' | 'orders' | 'check'
export interface PropsIcon extends IconBaseProps {
    name: NameIcon;
}