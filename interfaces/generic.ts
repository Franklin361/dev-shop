import { IconBaseProps } from "react-icons"

export type Element = JSX.Element | JSX.Element[]

export interface ILayoutShop {
    title?: string
    pageDesc?: string
    imgUrl?: string
}

export type NameIcon = 'men' | 'women' | 'board' | 'up' | 'down' |
    'kid' | 'search' | 'cart' | 'menu' | 'plus' | 'low' | 'warning' |
    'less' | 'close' | 'delete' | 'credit' | 'log-in' | 'reload'
    | 'log-out' | 'profile' | 'order' | 'products' | 'product' | 'users' | 'orders' | 'check'
export interface PropsIcon extends IconBaseProps {
    name: NameIcon;
}