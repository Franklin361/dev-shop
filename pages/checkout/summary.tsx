import { CartList, OrderSummary, ShopLayout } from "../../components"
import { useRouter } from 'next/router';



const SummaryPage = () => {
    const router = useRouter()
    return (
        <ShopLayout
            title="Dev-Shop | Order Summary"
            pageDesc="Summary of the order"
        >
            <section className="md:grid md:grid-cols-2 flex flex-col-reverse mt-10 gap-24 relative px-5">

                <section>
                    <h1 className="text-4xl font-bold">Order Summary</h1>
                    <CartList />
                </section>

                <section className="shadow-black shadow-2xl rounded-xl bg-neutral-focus p-5 flex flex-col gap-5 md:sticky md:top-32 h-fit">
                    <h4 className="text-4xl font-bold md:text-start text-center">Summary</h4>
                    <hr className="border border-gray-500" />

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <b className="mb-2">Delivery address</b>

                            <span
                                onClick={() => router.push(`/checkout/address`)}
                                className="link link-secondary">Edit Address</span>
                        </div>
                        <span>Franklin Martinez Lucas Hernandez</span>
                        <span>323 Real de Palmas</span>
                        <span>Ottawa, HYA 238</span>
                        <span>Canada</span>
                        <span>+5281234654</span>
                    </div>

                    <hr className="border border-gray-500" />

                    <span
                        onClick={() => router.push(`/cart`)}
                        className="link link-secondary text-end">Edit Products</span>

                    <OrderSummary />

                    <button
                        className="btn btn-block btn-primary"
                        onClick={() => router.push(`/order/123`)}
                    >Confirm order </button>
                </section>

            </section>
        </ShopLayout>
    )
}

export default SummaryPage