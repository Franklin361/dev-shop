import type { NextApiRequest, NextApiResponse } from 'next'
import { database, SHOP_CONSTANTS } from '../../../database'
import { IProduct } from '../../../interfaces'
import { ProductModel } from '../../../models'

type Data =
    { msg: string } |
    { products: IProduct[] }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET': return getProducts(req, res)

        default: return res.status(400).json({ msg: 'Bad request!' })
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender = 'all' } = req.query

    let condition = {}

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) condition = { gender };

    await database.connect();

    const products = await ProductModel.find(condition)
        .select('title images price slug inStock -_id')
        .lean();

    await database.disconnect();

    return res.status(200).json({ products })
}