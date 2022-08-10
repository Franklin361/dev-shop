import { useRouter } from "next/router"
import { ShopLayout } from "../../components"

import { GetServerSideProps, NextPage } from 'next';
import { getSession } from "next-auth/react"
import { dbOrders } from "../../database"
import { IOrder } from "../../interfaces"

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const router = useRouter()

    return (
        <ShopLayout title="Dev-Shop | History" pageDesc="Order history of user's purchases" >
            <section className="my-8 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold px-5">History</h1>

                <div className="overflow-x-auto mt-5 border border-gray-500 rounded-lg">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Paid order</th>
                                <th>See order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, i) => (
                                    <tr className="hover" key={order._id}>
                                        <th>{i + 1}</th>
                                        <td>{order.shippingAddress.name} {order.shippingAddress.lastName}</td>
                                        <td>
                                            <div className={`badge ${order.isPaid ? 'badge-success' : 'badge-error'} badge-outline badge-lg font-bold`}>
                                                {
                                                    order.isPaid ? 'Paid' : 'Not Paid'
                                                }
                                            </div>
                                        </td>
                                        <td> <p className="link link-secondary" onClick={() => router.push(`/order/${order._id}`)}>View order</p> </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
                {
                    orders.length === 0 && <div className="text-center w-full my-5 text-3xl font-bold text-info">No orders </div>
                }
            </section>
        </ShopLayout>
    )
}
export default HistoryPage



export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req })
    if (!session) return {
        redirect: {
            destination: '/auth/login?p=/order/history',
            permanent: false
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id)

    return {
        props: {
            orders
        }
    }
}