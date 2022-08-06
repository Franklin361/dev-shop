import jwt from 'jsonwebtoken'

const seed = process.env.NEXT_PUBLIC_SEED as string;

export const signToken = (_id: string, email: string) => {

    if (!seed) throw new Error("There is not seed for jwt");

    return jwt.sign({ _id, email }, seed, { expiresIn: '30d' })
}

export const isValidToken = async (token: string): Promise<string> => {

    if (!seed) throw new Error("There is not seed for jwt");

    return new Promise((resolve, reject) => {

        try {
            jwt.verify(token, seed, (err, payload) => {
                if (err) reject('token no valid!')
                const { _id } = payload as { _id: string }
                resolve(_id)
            })

        } catch (error) {
            reject('token no valid!')
        }

    })
}