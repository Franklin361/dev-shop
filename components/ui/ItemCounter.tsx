import { Icon } from "./Icon"

interface Props {
    size?: 'lg' | 'sm'
}

export const ItemCounter = ({ size = 'lg' }: Props) => {
    return (
        <div className="flex items-center gap-5">
            <button className={`btn btn-circle ${size === 'lg' ? 'btn-md' : 'btn-sm'}`}>
                <Icon name="plus" className={`${size === 'lg' ? 'text-3xl' : 'text-2xl'}`} />
            </button>

            <p className={`font-bold ${size === 'lg' ? 'text-2xl' : 'text-xl'}`}>1</p>

            <button className={`btn btn-circle ${size === 'lg' ? 'btn-md' : 'btn-sm'}`}>
                <Icon name="less" className={`${size === 'lg' ? 'text-3xl' : 'text-2xl'}`} />
            </button>
        </div>
    )
}