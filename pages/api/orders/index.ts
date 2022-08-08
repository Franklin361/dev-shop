import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { database } from '../../../database'
import { IOrder } from '../../../interfaces'
import { OrderModel, ProductModel } from '../../../models'

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

    const dbProduct = await ProductModel.find({ _id: { $in: productsIDs } })

    try {

        const subtotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProduct.find(prod => prod.id === current._id)!.price
            if (!currentPrice) throw new Error("Please check your cart again, this product does not exist.");
            return (currentPrice * current.quantity) + prev
        }, 0)

        const taxRate = Number(process.env.NEXT_PUBLIC_RATE) || 0
        const backendTotal = subtotal * (+taxRate + 1)

        if (total.toFixed(2) !== backendTotal.toFixed(2)) throw new Error("The total does not match the amount");

        const userId = (session.user as any)._id
        const newOrder = new OrderModel({
            isPaid: false,
            user: userId,
            ...req.body,
        })

        await newOrder.save()
        return res.status(400).json(newOrder)

    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: (error as Error).message || 'Check server logs' })
    } finally {
        await database.connect();
    }
}










