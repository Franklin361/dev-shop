import { Icon } from "./Icon"

interface Props {
    size?: 'lg' | 'sm'
    onChangeQuantity: (n: number) => void
    quantity: number
}

export const ItemCounter = ({ size = 'lg', onChangeQuantity, quantity }: Props) => {
    return (
        <div className="flex items-center gap-5">
            <button className={`btn btn-circle ${size === 'lg' ? 'btn-md' : 'btn-sm'}`} onClick={() => onChangeQuantity(quantity + 1)} >
                <Icon name="plus" className={`${size === 'lg' ? 'text-3xl' : 'text-2xl'}`} />
            </button>

            <div>
                <p className={`font-bold ${size === 'lg' ? 'text-2xl w-7' : 'text-xl'}`}>
                    {quantity.toString().length === 1 ? `0${quantity}` : quantity}
                </p>
            </div>

            <button className={`btn btn-circle ${size === 'lg' ? 'btn-md' : 'btn-sm'}`} onClick={() => onChangeQuantity(quantity - 1)}>
                <Icon name="less" className={`${size === 'lg' ? 'text-3xl' : 'text-2xl'}`} />
            </button>
        </div>
    )
}