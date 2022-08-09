import useSWR from 'swr';

import { AdminLayout, HeaderAdmin } from '../../components'
import { IOrder, IUser } from '../../interfaces';
import { useRouter } from 'next/router';

const OrdersPage = () => {
    const { push } = useRouter()
    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if (!data && !error) return (<></>);


    return (
        <AdminLayout title='Dev Shop | Admin - Orders'>
            <HeaderAdmin icon='orders' title='Orders' subtitle='Order maintenance' />
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Total Amount</th>
                        <th>Pagada</th>
                        <th>N. Products</th>
                        <th>View order</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(order => (
                            <tr className="hover" key={order._id}>
                                <th>{order._id}</th>
                                <td>{(order.user as IUser).email}</td>
                                <td>{(order.user as IUser).name}</td>
                                <td>{order.total}</td>
                                <td>
                                    <div className="badge badge-success badge-outline badge-lg">
                                        {order.isPaid ? 'Paid' : 'Not Paid'}
                                    </div>
                                </td>
                                <td>{order.numberOfItems}</td>
                                <td> <p className="link link-secondary" onClick={() => push(`/admin/orders/${order._id}`)}>View order</p> </td>
                                <td>{order.createdAt}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    )
}

export default OrdersPage