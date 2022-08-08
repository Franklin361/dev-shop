import { useCartStore } from "../../store"

interface Props {
    numberOfItems: number
    subtotal: number
    taxRate: number
    tax: number
    total: number
}

export const OrderSummary = ({ ...summary }: Props) => {



    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-baseline">
                    <span>N. Products</span>
                    <hr className="flex-1 border-dashed border border-gray-400 " />
                    <span className="font-bold">
                        {summary.numberOfItems} {summary.numberOfItems > 1 ? 'items' : 'item'}
                    </span>
                </div>

                <div className="flex gap-2 items-baseline">
                    <span>Sub Total</span>
                    <hr className="flex-1 border-dashed border border-gray-400 " />
                    <span className="font-bold">$ {summary.subtotal.toFixed(2)} </span>
                </div>

                <div className="flex gap-2 items-baseline">
                    <span>Taxes ({summary.taxRate * 100}%)</span>
                    <hr className="flex-1 border-dashed border border-gray-400 " />
                    <span className="font-bold">$ {summary.tax.toFixed(2)}</span>
                </div>

            </div>

            <div className="flex justify-between items-center font-bold mt-4 mb-2 text-2xl">
                <span>Total </span>
                <span className="font-extrabold text-3xl text-accent">$ {summary.total.toFixed(2)}</span>
            </div>
        </>
    )
}