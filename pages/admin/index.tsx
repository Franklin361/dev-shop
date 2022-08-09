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
            <HeaderAdmin icon='products' title='Dashboard' subtitle='General statistics' />

            <div className='grid grid-cols-2 gap-10'>
                <SummaryTile icon='credit' subtitle='Total orders' title={data!.numberOfOrders} />
                <SummaryTile icon='credit' subtitle='Paid orders' title={data!.paidOrders} />
                <SummaryTile icon='credit' subtitle='Pending orders' title={data!.notPaidOrders} />
                <SummaryTile icon='credit' subtitle='Clients' title={data!.numberOfClients} />
                <SummaryTile icon='credit' subtitle='Products' title={data!.numberOfProducts} />
                <SummaryTile icon='credit' subtitle='Out of stock' title={data!.productsWithNoInventory} />
                <SummaryTile icon='credit' subtitle='Low inventory' title={data!.lowInventory} />
                <SummaryTile icon='credit' subtitle='Updating in...' title={refreshIn} />
            </div>

        </AdminLayout>
    )
}
export default AdminPage