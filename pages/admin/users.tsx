import { devShopApi } from "../../api";
import { AdminLayout, HeaderAdmin, Icon } from "../../components"
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { IRole, IUser } from "../../interfaces";

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [users, setUsers] = useState<IUser[]>([]);


    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data])


    if (!data && !error) return (<></>);

    const onRoleUpdated = async (userId: string, newRole: IRole) => {

        const previosUsers = users.map(user => ({ ...user }));
        const updatedUsers: IUser[] = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers(updatedUsers);

        try {

            await devShopApi.put('/admin/users', { userId, role: newRole });

        } catch (error) {
            setUsers(previosUsers);
            console.log(error);
            alert('Could not update user role');
        }

    }

    return (
        <AdminLayout title="Dev Shop | Admin - Users">
            <HeaderAdmin icon='users' title='Users' subtitle='User maintenance' color='secondary' />

            <div className="flex gap-5 flex-col">
                {
                    users.map((user) => (
                        <CollapseItem key={user._id} onRoleUpdated={onRoleUpdated} user={user} />
                    ))
                }
            </div>
        </AdminLayout>
    )
}
export default UsersPage

interface Props {
    user: IUser,
    onRoleUpdated: (userId: string, newRole: IRole) => Promise<void>

}

export const CollapseItem = ({ user, onRoleUpdated }: Props) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`border fade-in  rounded-md overflow-hidden ${isOpen ? 'border-secondary bg-black/70' : ''}`}>
            <div className=" p-3 cursor-pointer select-none flex justify-between items-center" onClick={() => setIsOpen(prev => !prev)}>
                <p>{user._id}</p>
                <Icon name="down" className={`text-3xl transition-all ease-in ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {
                isOpen && <>
                    <hr />
                    <div className="fade-in-up px-3 py-5 flex md:gap-0 gap-5 md:items-center items-start md:justify-evenly justify-start md:flex-row flex-col">
                        <div className="flex md:flex-col md:items-start items-center flex-row gap-2"> <span>Name:</span> <span className="font-bold">{user.name}</span></div>
                        <div className="flex md:flex-col md:items-start items-center flex-row gap-2"> <span>E-mail:</span> <span className="font-bold">{user.email}</span></div>
                        <div className="flex md:flex-col md:items-start items-center flex-row gap-2">
                            <span>Rol:</span>
                            <select
                                className={`select select-bordered select-secondary w-full text-lg`}
                                defaultValue={user.role}
                                onChange={({ target }) => onRoleUpdated(user._id!, target.value as IRole)}
                            >
                                <option value="client">Client</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}