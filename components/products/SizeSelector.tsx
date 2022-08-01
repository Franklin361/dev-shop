import { ISize } from "../../interfaces";

interface Props {
    selectedSize: ISize;
    sizes: ISize[]
}
export const SizeSelector = ({ selectedSize, sizes }: Props) => {
    return (
        <div className="flex gap-3 flex-wrap">
            {
                sizes.map(size => (
                    <button
                        key={size}
                        className={`btn ${selectedSize === size ? 'btn-secondary select-none pointer-events-none' : ''}`}
                    >
                        {size}
                    </button>
                ))
            }
        </div>
    )
}