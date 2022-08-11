import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderModel, ProductModel, UserModel } from '../../../models'
import { IDashboard } from '../../../interfaces'
import { database } from '../../../database'

type Data = IDashboard

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await database.connect()
    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory
    ] = await Promise.all([
        OrderModel.count(),
        OrderModel.find({ isPaid: true }).count(),
        UserModel.find({ role: 'client' }).count(),
        ProductModel.count(),
        ProductModel.find({ inStock: 0 }).count(),
        ProductModel.find({ inStock: { $lte: 10 } }).count(),
    ])
    await database.disconnect()

    return res.json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders,
    })

}