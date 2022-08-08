import { isValidObjectId } from 'mongoose';
import { database } from '.';
import { IOrder } from '../interfaces';
import { OrderModel } from '../models';
export const getOrderById = async (id: string): Promise<IOrder | null> => {

    if (!isValidObjectId(id)) return null

    await database.connect()
    const order = await OrderModel.findById(id).lean()
    await database.disconnect()

    return order ? JSON.parse(JSON.stringify(order)) : null
}

export const getOrdersByUser = async (id: string): Promise<IOrder[]> => {

    if (!isValidObjectId(id)) return []

    await database.connect()
    const orders = await OrderModel.find({ user: id }).lean()
    await database.disconnect()

    return JSON.parse(JSON.stringify(orders))
}

