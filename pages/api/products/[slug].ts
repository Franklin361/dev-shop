import type { NextApiRequest, NextApiResponse } from 'next'
import { database, SHOP_CONSTANTS } from '../../../database'
import { IProduct } from '../../../interfaces'
import { ProductModel } from '../../../models'

type Data =
    { msg: string } |
    { product: IProduct }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET': return getProductBySlug(req, res)

        default: return res.status(400).json({ msg: 'Bad request!' })
    }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug = '' } = req.query

    if (!slug) return res.status(400).json({ msg: 'Slug invalid!' })

    await database.connect();

    const product = await ProductModel.findOne({ slug }).lean()

    await database.disconnect();

    if (!product) return res.status(400).json({ msg: 'That product does not exist!' })

    return res.status(200).json({ product })
}