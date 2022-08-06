import type { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../database'
import { UserModel } from '../../../models'
import bcryptjs from 'bcryptjs';
import { IRole } from '../../../interfaces';
import { isEmail, isValidEmail, jwt } from '../../../utils';

type Data = { msg: string } | { token: string, user: { email: string, name: string, role: IRole } }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST': return registerUser(req, res)

        default: res.status(400).json({ msg: 'Bad request' })
    }

}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string }


    if (password.length < 6) return res.status(400).json({ msg: 'Password should have 6 or more characters!' })

    if (name.length < 3) return res.status(400).json({ msg: 'Password should have 3 or more characters!' })

    if (!isValidEmail(email)) return res.status(400).json({ msg: 'E-mail is not valid!' })


    await database.connect()

    const user = await UserModel.findOne({ email });

    if (user) {
        await database.disconnect()
        return res.status(400).json({ msg: 'User already exists!' })
    }

    try {
        const newUser = new UserModel({
            email: email.toLowerCase(),
            password: bcryptjs.hashSync(password),
            role: 'client',
            name
        })

        await newUser.save({ validateBeforeSave: true })

        const token = await jwt.signToken(newUser._id, newUser.email)

        return res.status(201).json({
            token,
            user: {
                email,
                role: newUser.role,
                name: name
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Look at logs in the server' })
    } finally {
        await database.disconnect()
    }
}





