export interface IUser {
    name: string
    email: string
    password?: string
    role: IRole
    _id?: string
    createdAt?: string;
    updatedAt?: string;
}

export type IRole = 'client' | 'admin'



