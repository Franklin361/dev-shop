import { devShopApi } from "../../api";
import { AdminLayout, HeaderAdmin } from "../../components"
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
            <HeaderAdmin icon='users' title='Users' subtitle='User maintenance' />
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr className="hover" key={user._id}>
                                <th>{user._id}</th>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>
                                    <select
                                        className={`select select-bordered select-secondary w-full text-lg`}
                                        defaultValue={user.role}
                                        onChange={({ target }) => onRoleUpdated(user._id!, target.value as IRole)}
                                    >
                                        <option value="client">Client</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    )
}
export default UsersPage