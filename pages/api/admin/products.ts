import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { IProduct } from '../../../interfaces';
import { database } from '../../../database';
import { ProductModel } from '../../../models';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');


type Data =
    | { message: string }
    | IProduct[]
    | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);

        case 'PUT':
            return updateProduct(req, res);

        case 'POST':
            return createProduct(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' });
    }


}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await database.connect()
    const products = await ProductModel.find().sort({ title: 'asc' }).lean();
    await database.disconnect()

    res.status(200).json(products);
}


const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', images = [] } = req.body as IProduct;

    if (!isValidObjectId(_id)) return res.status(400).json({ message: 'The product ID is invalid' });

    if (images.length < 2) return res.status(400).json({ message: 'At least 2 images are required' });

    try {

        await database.connect();
        const product = await ProductModel.findById(_id);
        if (!product) {
            await database.disconnect();
            return res.status(400).json({ message: 'There is no product with this ID' });
        }

        product.images.forEach(async (image) => {
            if (!images.includes(image)) {
                const [fileId, extension] = image.substring(image.lastIndexOf('/') + 1).split('.')
                await cloudinary.uploader.destroy(fileId);
            }
        });

        await product.update(req.body);
        await database.disconnect();


        return res.status(200).json(product);

    } catch (error) {
        console.log(error);
        await database.disconnect();
        return res.status(400).json({ message: 'Check the server console' });
    }


}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


    const { images = [] } = req.body as IProduct;

    if (images.length < 2) return res.status(400).json({ message: 'At least 2 images are required' });

    try {
        await database.connect();
        const productInDB = await ProductModel.findOne({ slug: req.body.slug });
        if (productInDB) {
            await database.disconnect();
            return res.status(400).json({ message: 'A product with this slug already exists' });
        }

        const product = new ProductModel(req.body);
        await product.save();
        await database.disconnect();

        res.status(201).json(product);

    } catch (error) {
        console.log(error);
        await database.disconnect();
        return res.status(400).json({ message: 'Check the server console' });;
    }

}

