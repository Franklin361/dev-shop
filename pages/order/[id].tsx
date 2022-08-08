import { CartList, Chip, OrderSummary, ShopLayout } from "../../components"
import { useRouter } from 'next/router';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const router = useRouter()

    return (
        <ShopLayout
            title="Dev-Shop | Order Summary 123654"
            pageDesc="Summary of the order"
        >
            <section className="md:grid md:grid-cols-2 flex flex-col-reverse mt-10 gap-24 relative px-5">

                <section>
                    <h1 className="text-4xl font-bold">Order: <span className="text-info">{order._id}</span></h1>
                    {
                        order.isPaid
                            ? <Chip
                                icon="credit"
                                label="This order has already been paid"
                                type="badge-success"
                            />
                            : <Chip
                                icon="credit"
                                label="This order has not yet been paid"
                            />
                    }

                    <CartList products={order.orderItems} />

                </section>

                <section className="shadow-black shadow-2xl rounded-xl bg-neutral-focus p-5 flex flex-col gap-5 md:sticky md:top-32 h-fit">
                    <h4 className="text-4xl font-bold md:text-start text-center">Summary</h4>
                    <hr className="border border-gray-500" />

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <b className="mb-2">Delivery address</b>
                        </div>
                        <span>{order.shippingAddress.name} {order.shippingAddress.lastName}</span>
                        <span>{order.shippingAddress.address} , {order.shippingAddress?.address2}</span>
                        <span>{order.shippingAddress.city}, {order.shippingAddress.zip}</span>
                        <span>{countries.find(item => item.code === order.shippingAddress.country)?.name}</span>
                        <span>{order.shippingAddress.phone}</span>
                    </div>

                    <hr className="border border-gray-500" />

                    <OrderSummary
                        numberOfItems={order.numberOfItems}
                        subtotal={order.subtotal}
                        tax={order.tax}
                        total={order.total}
                        taxRate={Number(process.env.NEXT_PUBLIC_RATE) || 0}
                    />
                    {
                        order.isPaid
                            ? <p className="alert alert-success">Order paid</p>
                            :
                            <button
                                className="btn btn-block btn-primary"
                            // onClick={() => router.push(`cart/address/`)} 
                            >
                                Pay
                            </button>
                    }
                </section>

            </section>
        </ShopLayout>
    )
}

export default OrderPage


import { GetServerSideProps, NextPage } from 'next'
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { countries } from '../../utils/countries';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query

    const session: any = await getSession({ req })

    if (!session) return {
        redirect: {
            destination: `/auth/login?p=/order/${id}`,
            permanent: false
        }
    }

    const order = await dbOrders.getOrderById(id.toString())
    if (!order) return {
        redirect: {
            destination: `/orders/history`,
            permanent: false
        }
    }

    if (order.user !== session.user._id) return {
        redirect: {
            destination: `/orders/history`,
            permanent: false
        }
    }



    return {
        props: {
            order
        }
    }
}

