export const OrderSummary = () => {
    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-baseline">
                    <span>N. Products</span>
                    <hr className="flex-1 border-dashed border border-gray-400 " />
                    <span className="font-bold">3 items</span>
                </div>

                <div className="flex gap-2 items-baseline">
                    <span>Sub Total</span>
                    <hr className="flex-1 border-dashed border border-gray-400 " />
                    <span className="font-bold">3 items</span>
                </div>

                <div className="flex gap-2 items-baseline">
                    <span>Taxes (15%)</span>
                    <hr className="flex-1 border-dashed border border-gray-400 " />
                    <span className="font-bold">3 items</span>
                </div>

            </div>

            <div className="flex justify-between items-center font-bold mt-4 mb-2 text-2xl">
                <span>Total </span>
                <span className="font-extrabold text-3xl text-accent">$ 1004.95</span>
            </div>
        </>
    )
}