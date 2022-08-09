import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { IUser } from '../../../interfaces';
import { database } from '../../../database';
import { UserModel } from '../../../models';


type Data =
    | { message: string }
    | IUser[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getUsers(req, res);

        case 'PUT':
            return updateUser(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })

    }


}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await database.connect()
    const users = await UserModel.find().select('-password').lean();
    await database.disconnect();

    return res.status(200).json(users);
}



const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { userId = '', role = '' } = req.body;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'No user exists for this ID' })
    }

    const validRoles = ['admin', 'client'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Role not allowed: ' + validRoles.join(', ') })
    }

    await database.connect();
    const user = await UserModel.findById(userId);

    if (!user) {
        await database.disconnect();
        return res.status(404).json({ message: 'User not found: ' + userId });
    }

    user.role = role;
    await user.save();
    await database.disconnect();

    return res.status(200).json({ message: 'User updated successfully' });

}

