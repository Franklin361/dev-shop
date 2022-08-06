import type { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../database'
import { UserModel } from '../../../models'
import bcryptjs from 'bcryptjs';
import { IRole } from '../../../interfaces';
import { jwt } from '../../../utils';

type Data = { msg: string } | { token: string, user: { email: string, name: string, role: IRole } }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST': return loginUser(req, res)

        default: res.status(400).json({ msg: 'Bad request' })
    }

}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '' } = req.body

    await database.connect()
    const user = await UserModel.findOne({ email })
    await database.disconnect()

    if (!user) return res.status(400).json({ msg: 'Email / Password no valid' })

    if (!(bcryptjs.compareSync(password, user.password!))) return res.status(400).json({ msg: 'Email / Password no valid' })

    return res.status(201).json({
        token: jwt.signToken(user._id, user.email),
        user: {
            email,
            role: user.role,
            name: user.name
        }
    })
}





