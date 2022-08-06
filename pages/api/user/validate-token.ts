import type { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../../database'
import { UserModel } from '../../../models'
import { IRole } from '../../../interfaces';
import { jwt } from '../../../utils';


type Data = { msg: string } | { token: string, user: { email: string, name: string, role: IRole } }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET': return checkJWT(req, res)

        default: res.status(400).json({ msg: 'Bad request' })
    }

}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = '' } = req.cookies as { token: string }

    await database.connect()
    let userId = ''
    try {
        userId = await jwt.isValidToken(token)
    } catch (error) {
        return res.status(401).json({ msg: 'Authorization token no valid' })
    }

    await database.connect()
    const user = await UserModel.findById(userId).lean()
    await database.disconnect()

    if (!user) return res.status(400).json({ msg: 'User no exists!' })

    return res.status(201).json({
        token: jwt.signToken(user._id, user.email),
        user: {
            email: user.email,
            role: user.role,
            name: user.name
        }
    })
}





