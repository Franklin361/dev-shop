import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { PaypalOrderStatusResponse } from '../../../interfaces';

import { OrderModel } from '../../../models';
import { database } from '../../../database';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST': return payOrder(req, res)

        default: res.status(400).json({ message: 'Bad Request' })
    }
}

const getPayPalBearerToken = async (): Promise<string | null> => {
    const oauthUrl = process.env.PAYPAL_OAUTH_URL as string
    const client = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string
    const secret = process.env.PAYPAL_SECRET as string

    const base64Token = Buffer.from(`${client}:${secret}`, 'utf-8').toString('base64')
    const body = new URLSearchParams('grant_type=client_credentials')

    try {
        const { data } = await axios.post(oauthUrl || '', body, {
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return data.access_token

    } catch (error) {
        if (axios.isAxiosError(error)) console.log(error.response?.data)
        else console.log(error)

        return null
    }
}

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {

    const payPalBearerToken = await getPayPalBearerToken()

    if (!payPalBearerToken) return res.status(400).json({ message: 'No PayPal token' })

    const { transactionId = '', orderId = '' } = req.body

    const url = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`

    const { data } = await axios.get<PaypalOrderStatusResponse>(url, {
        headers: {
            'Authorization': `Bearer ${payPalBearerToken}`,
        }
    })

    if (data.status !== 'COMPLETED') return res.status(400).json({ message: 'Unrecognized order' })

    await database.connect()

    const order = await OrderModel.findById(orderId)

    if (!order) {
        await database.disconnect()
        return res.status(400).json({ message: 'The order does not exist in the database' })
    }

    if (order.total !== +data.purchase_units[0].amount.value) {
        await database.disconnect()
        return res.status(400).json({ message: 'The PayPal amounts and our order are different' })
    }

    order.transactionId = transactionId
    order.isPaid = true

    await order.save()

    await database.disconnect()

    return res.status(200).json({ message: 'Your order has been paid' })
}





























