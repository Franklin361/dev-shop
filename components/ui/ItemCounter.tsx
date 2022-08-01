import { Icon } from "./Icon"

export const ItemCounter = () => {
    return (
        <div className="flex items-center gap-5">
            <button className="btn btn-circle btn-md">
                <Icon name="plus" className="text-3xl" />
            </button>
            <p className="font-bold text-2xl">1</p>
            <button className="btn btn-circle btn-md">
                <Icon name="less" className="text-3xl" />
            </button>
        </div>
    )
}