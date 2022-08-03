import { database } from "."
import { IProduct } from "../interfaces"
import { ProductModel } from "../models"

export const getProductsBySlug = async (slug: string): Promise<IProduct | null> => {

    await database.connect()
    const product = await ProductModel.findOne({ slug }).lean()
    await database.disconnect()

    if (!product) return null;

    return JSON.parse(JSON.stringify(product))
}

interface ProductSlug {
    slug: string
}

export const getAllProductsSlug = async (): Promise<ProductSlug[]> => {

    await database.connect()
    const slugs = await ProductModel.find().select('slug -_id').lean()
    await database.disconnect()

    return slugs
}

export const getProductsByTerm = async (q: string): Promise<IProduct[]> => {

    q = q.toString().toLowerCase();

    await database.connect()

    const products = await ProductModel.find({
        $text: { $search: q }
    }).select('title images price slug inStock -_id').lean()

    await database.disconnect()

    return products
}

export const getAllProducts = async (): Promise<IProduct[]> => {

    await database.connect()
    const products = await ProductModel.find().select('title images price slug inStock -_id').lean()
    await database.disconnect()

    return products
}