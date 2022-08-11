import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { OrderModel, ProductModel } from '../../../models'
import { database } from '../../../database'
import { IOrder } from '../../../interfaces'

type Data = { message: string } | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST': return createOrder(req, res)
        default: return res.status(400).json({ message: 'Bad Request' })
    }
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { orderItems, total } = req.body as IOrder

    const session = await getSession({ req })

    if (!session) return res.status(401).json({ message: 'Should be authenticated!' })

    const productsIDs = orderItems.map(item => item._id)

    try {
        await database.connect();

        const dbProduct = await ProductModel.find({ _id: { $in: productsIDs } })

        const subtotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProduct.find(prod => prod.id === current._id)!.price
            if (!currentPrice) throw new Error("Please check your cart again, this product does not exist.");
            return (currentPrice * current.quantity) + prev
        }, 0)

        const taxRate = Number(process.env.NEXT_PUBLIC_RATE) || 0
        const backendTotal = subtotal * (+taxRate + 1)

        if (total.toFixed(2) !== backendTotal.toFixed(2)) throw new Error("The total does not match the amount");

        const userId = (session.user as { _id: string })._id
        const newOrder = new OrderModel({
            ...req.body,
            isPaid: false,
            user: userId,
        })

        newOrder.total = +newOrder.total.toFixed(2)

        await newOrder.save()

        return res.status(200).json(newOrder)

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: (error as Error).message || 'Check server logs' })
    } finally {
        await database.disconnect();
    }
}










