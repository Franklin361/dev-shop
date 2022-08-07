import { CartList, OrderSummary, ShopLayout } from "../../components"
import { useRouter } from 'next/router';
import { useCartStore } from "../../store";
import { countries } from '../../utils/countries';
import { useEffect } from 'react';
import Cookies from "js-cookie";



const SummaryPage = () => {
    const router = useRouter()
    const { shippingAddress, numberOfItems } = useCartStore(({ shippingAddress, numberOfItems }) => ({ shippingAddress, numberOfItems }))

    useEffect(() => {
        if (!Cookies.get('firstName')) router.push('/checkout/address')
    }, [])


    if (!shippingAddress) return null

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
                    <h4 className="text-4xl font-bold md:text-start text-center">Summary <span className="font-bold text-sm">{numberOfItems} {numberOfItems >= 1 ? 'product' : 'products'} </span> </h4>
                    <hr className="border border-gray-500" />

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <b className="mb-2">Delivery address</b>

                            <span
                                onClick={() => router.push(`/checkout/address`)}
                                className="link link-secondary">Edit Address</span>
                        </div>
                        <span>{shippingAddress.name} {shippingAddress.lastName}</span>
                        <span>{shippingAddress.address}, {shippingAddress.address2 ? shippingAddress.address2 : ''}</span>
                        <span>{shippingAddress.city}, {shippingAddress.zip}</span>
                        <span>{countries.find(item => item.code === shippingAddress.country)?.name}</span>
                        <span>{shippingAddress.phone}</span>
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