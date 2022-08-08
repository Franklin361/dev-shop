import { CartList, OrderSummary, ShopLayout } from "../../components"
import { useRouter } from 'next/router';
import { useCartStore } from '../../store';
import { useEffect } from 'react';



const CartPage = () => {

    const router = useRouter()
    const { isLoaded, cart } = useCartStore(({ isLoaded, cart }) => ({ isLoaded, cart }))
    const summary = useCartStore(({ numberOfItems, tax, taxRate, subtotal, total }) => ({ numberOfItems, tax, taxRate, subtotal, total }))

    useEffect(() => {
        if (isLoaded && cart.length === 0) router.replace('/cart/empty')
    }, [isLoaded, cart, router])

    if (cart.length === 0) return <></>

    return (
        <ShopLayout
            title="Dev-Shop | Cart"
            pageDesc="Shopping cart of the store"
        >
            <section className="md:grid md:grid-cols-2 flex flex-col-reverse mt-10 gap-24 relative px-5">

                <section>
                    <h1 className="text-4xl font-bold">Cart <span className="text-gray-400 text-base font-normal">(products in cart so far...)</span></h1>

                    <CartList isEdit />
                </section>

                <section className="shadow-black shadow-2xl rounded-xl bg-neutral-focus p-5 flex flex-col gap-5 md:sticky md:top-32 h-fit">
                    <h4 className="text-4xl font-bold md:text-start text-center">Order Summary</h4>
                    <hr className="border border-gray-500" />

                    <OrderSummary
                        {...summary}
                    />

                    <button
                        className="btn btn-block btn-primary"
                        onClick={() => router.push(`/checkout/address/`)}
                    >Checkout</button>
                </section>

            </section>
        </ShopLayout>
    )
}

export default CartPage