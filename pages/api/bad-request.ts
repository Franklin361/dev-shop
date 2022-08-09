import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string | string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { message = 'Ups, something is wrong! 😞', status = '500' } = req.query

    res.status(+status).json({ message });
}