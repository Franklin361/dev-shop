import type { NextApiRequest, NextApiResponse } from 'next'
import { database, SHOP_CONSTANTS } from '../../../database'
import { IProduct } from '../../../interfaces'
import { ProductModel } from '../../../models'

type Data =
    { msg: string } |
    { products: IProduct[] }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET': return searchProducts(req, res)

        default: return res.status(400).json({ msg: 'Bad request!' })
    }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { q = '' } = req.query

    if (!q) return res.status(400).json({ msg: 'You should specify the query!' })

    q = q.toString().toLowerCase();

    await database.connect();

    const products = await ProductModel.find({
        $text: { $search: q }
    }).select('title images price slug inStock -_id').lean()

    await database.disconnect();

    return res.status(200).json({ products })
}