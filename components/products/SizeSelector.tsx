import { ISize } from "../../interfaces";

interface Props {
    selectedSize?: ISize;
    sizes: ISize[]
    onSelectSize: (size: ISize) => void
}
export const SizeSelector = ({ selectedSize, sizes, onSelectSize }: Props) => {
    return (
        <div className="flex gap-3 flex-wrap">
            {
                sizes.map(size => (
                    <button
                        key={size}
                        className={`btn ${selectedSize === size ? 'btn-secondary select-none pointer-events-none' : ''}`}
                        onClick={() => onSelectSize(size)}
                    >
                        {size}
                    </button>
                ))
            }
        </div>
    )
}