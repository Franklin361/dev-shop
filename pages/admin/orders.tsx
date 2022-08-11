import useSWR from 'swr';

import { AdminLayout, CollapseItem, HeaderAdmin } from '../../components'
import { IOrder, IUser } from '../../interfaces';
import { useRouter } from 'next/router';


const OrdersPage = () => {
    const { push } = useRouter()
    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) return (<></>);


    return (
        <AdminLayout title='Dev Shop | Admin - Orders'>
            <HeaderAdmin icon='orders' title='Orders' subtitle='Order maintenance' color='accent' />
            <>
                {
                    data?.length !== 0 ? data && data.map(order => (
                        <CollapseItem title={order._id!} key={order._id}>
                            <hr />
                            <div className="fade-in-up px-3 py-5 gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                                <div className="flex md:items-start items-center flex-row gap-2">
                                    <span>Name user:</span>
                                    <span className="font-bold">{(order.user as IUser).name}</span>
                                </div>
                                <div className="flex md:items-start items-center flex-row gap-2">
                                    <span>E-mail user:</span>
                                    <span className="font-bold">{(order.user as IUser).email}</span>
                                </div>
                                <div className="flex md:items-start items-center flex-row gap-2">
                                    <span>Amount total:</span>
                                    <span className="font-bold">$ {order.total}</span>
                                </div>
                                <div className="flex md:items-start items-center flex-row gap-2">
                                    <span>Number of items:</span>
                                    <span className="font-bold"> {order.numberOfItems}</span>
                                </div>
                                <div className="flex md:items-start items-center flex-row gap-2">
                                    <span>This orders is:</span>
                                    <div className={`badge badge-${order.isPaid ? 'success' : 'error'} badge-outline badge-lg`}>
                                        {order.isPaid ? 'Paid' : 'Not Paid'}
                                    </div>
                                </div>
                                <div className="flex md:items-start items-center flex-row gap-2">
                                    <span>Created at:</span>
                                    <span className='font-bold'>{order.createdAt}</span>
                                </div>
                            </div>
                            <div className='px-3 pb-5'>
                                <p className="btn w-full btn-accent" onClick={() => push(`/admin/orders/${order._id}`)}>View order</p>
                            </div>
                        </CollapseItem>
                    ))
                        : <div className='rounded-full w-full p-3 bg-accent text-center'>
                            <span className='font-bold w-full text-2xl text-black'>No orders</span>
                        </div>
                }
            </>
        </AdminLayout>
    )
}

export default OrdersPage
