import bcryptjs from 'bcryptjs';
import { database } from '.';
import { UserModel } from '../models';

export const checkoutUserEmailPassword = async (email: string, password: string) => {
    await database.connect()
    const user = await UserModel.findOne({ email })
    await database.disconnect()

    if (!user) return null

    if (!bcryptjs.compareSync(password, user.password!)) return null

    return {
        _id: user._id,
        email: email.toLowerCase(),
        role: user.role,
        name: user.name
    }
}


export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await database.connect()
    const user = await UserModel.findOne({ email: oAuthEmail })


    if (user) {
        await database.disconnect()
        const { _id, name, email, role } = user
        return { _id, name, email, role }
    }

    const newUser = new UserModel({ email: oAuthEmail, password: '@', name: oAuthName, role: 'client' });
    await newUser.save()

    await database.disconnect()

    const { _id, name, email, role } = newUser

    return {
        _id, name, email, role
    }
}





