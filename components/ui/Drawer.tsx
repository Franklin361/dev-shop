import { useRouter } from "next/router"
import { useState } from "react"
import { useContextAuth } from "../../hooks"
import { Element } from "../../interfaces"
import { Icon } from "./Icon"

interface Props {
    children: Element
}

export const Drawer = ({ children }: Props) => {

    const { asPath, push } = useRouter()

    const { isLoggedIn, user, logOut } = useContextAuth()

    const [searchText, setSearchText] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim().length === 0) return
        push(`/search/${searchText}`)
    }


    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay backdrop-blur-sm" ></label>

                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content backdrop-filter">

                    {
                        user?.role === 'client' && <>
                            <h5 className="">Search</h5>
                            <hr className="" />
                            <form onSubmit={handleSearch} className="center gap-2">
                                <input
                                    type="text" placeholder="Name"
                                    className=" input input-bordered input-primary w-full text-lg my-5"
                                    onChange={e => setSearchText(e.target.value)}
                                    value={searchText}
                                />
                                <button className="btn btn-primary"><Icon name="search" className="text-xl cursor-pointer" /></button>
                            </form>
                        </>
                    }

                    {
                        isLoggedIn && user?.role === 'client' && <>

                            {/* <li className=" mb-2">
                                <a className={`${asPath === '' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => { }}><Icon className="text-xl" name="profile" />Profile ( {user?.name} )</a>
                            </li> */}
                            <li className=" mb-2">
                                <a className={`${asPath === '/order/history' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/order/history')}><Icon className="text-xl" name="order" />My orders</a>
                            </li>
                        </>
                    }
                    {
                        isLoggedIn && <li className=" mb-2">
                            <a
                                onClick={logOut}
                            ><Icon className="text-xl" name="log-out" />Log out</a>
                        </li>
                    }
                    {
                        !isLoggedIn && <li className=" mb-2">
                            <a onClick={() => push(`/auth/login?p=${asPath}`)}><Icon className="text-xl" name="log-in" />Log in</a>
                        </li>
                    }

                    {
                        (isLoggedIn && user?.role === 'client') && <>
                            <h5 className="">Gender</h5>
                            <hr className="mb-5 " />

                            <li className=" mb-2">
                                <a className={`${asPath === '/category/men' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/men')}><Icon className="text-xl" name="men" /> Men</a>
                            </li>
                            <li className=" mb-2">
                                <a className={`${asPath === '/category/women' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/women')}><Icon className="text-xl" name="women" /> Women</a>
                            </li>
                            <li className=" mb-2">
                                <a className={`${asPath === '/category/kid' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/kid')}><Icon className="text-xl" name="kid" /> Kids</a>
                            </li>

                        </>
                    }
                    {
                        isLoggedIn && user?.role === 'admin' && <>
                            <h5 className="">Admin Panel</h5>
                            <hr className="mb-5 " />
                            <li className=" mb-2">
                                <a className={`${asPath === '/admin' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/admin')}><Icon className="text-xl" name="board" />Dashboard</a>
                            </li>
                            <li className=" mb-2">
                                <a className={`${asPath === '/admin/orders' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/admin/orders')}><Icon className="text-xl" name="orders" />Orders</a>
                            </li>
                            <li className=" mb-2">
                                <a className={`${asPath === '/admin/users' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/admin/users')}><Icon className="text-xl" name="users" />Users</a>
                            </li>
                            <li className=" mb-2">
                                <a className={`${asPath === '/admin/products' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/admin/products')}><Icon className="text-xl" name="products" />Products</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>

    )
}