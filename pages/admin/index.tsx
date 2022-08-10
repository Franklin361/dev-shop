import { NextPage } from 'next';
import useSWR from 'swr';

import { AdminLayout, HeaderAdmin, Icon, SummaryTile } from '../../components';

import { IDashboard } from '../../interfaces';
import { useState, useEffect } from 'react';

const AdminPage: NextPage = () => {

    const { data, error } = useSWR<IDashboard>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
    })

    const [refreshIn, setRefreshIn] = useState(30)

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn(prev => prev > 0 ? prev - 1 : 30)
        }, 1000)

        return () => clearInterval(interval)
    }, [])


    if (!data && !error) return <></>

    if (error) {
        console.log(error)
        return <>{error}</>
    }


    return (
        <AdminLayout>
            <HeaderAdmin icon='board' title='Dashboard' subtitle='General statistics' color='black/70' />

            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10'>
                <SummaryTile color='info' icon='orders' subtitle='Total orders' title={data!.numberOfOrders} />
                <SummaryTile color='success' icon='credit' subtitle='Paid orders' title={data!.paidOrders} />
                <SummaryTile color='error' icon='close' subtitle='Pending orders' title={data!.notPaidOrders} />
                <SummaryTile color='accent' icon='users' subtitle='Clients' title={data!.numberOfClients} />
                <SummaryTile color='black/70' icon='products' subtitle='Products' title={data!.numberOfProducts} />
                <SummaryTile color='warning' icon='warning' subtitle='Out of stock' title={data!.productsWithNoInventory} />
                <SummaryTile color='primary' icon='low' subtitle='Low inventory' title={data!.lowInventory} />
                <SummaryTile color='secondary' icon='reload' subtitle='Updating in...' title={refreshIn} />
            </div>

        </AdminLayout>
    )
}
export default AdminPage