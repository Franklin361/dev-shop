import type { NextApiRequest, NextApiResponse } from 'next'


type Data =
    { msg: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    return res.status(400).json({ msg: 'You should specify the query!' })
}
