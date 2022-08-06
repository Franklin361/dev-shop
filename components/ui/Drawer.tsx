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

                    <h5 className="md:hidden block">Search</h5>
                    <hr className="md:hidden block" />
                    <form onSubmit={handleSearch} className="center gap-2">
                        <input
                            type="text" placeholder="Name"
                            className="md:hidden block input input-bordered input-primary w-full text-lg my-5"
                            onChange={e => setSearchText(e.target.value)}
                            value={searchText}
                        />
                        <button className="btn btn-primary"><Icon name="search" className="text-xl cursor-pointer" /></button>
                    </form>
                    {
                        isLoggedIn && <>

                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/kid' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/kid')}><Icon className="text-xl" name="profile" />Profile</a>
                            </li>
                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/kid' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/kid')}><Icon className="text-xl" name="order" />My orders</a>
                            </li>
                            <li className="md:hidden block mb-2">
                                <a
                                    onClick={logOut}
                                ><Icon className="text-xl" name="log-out" />Log out</a>
                            </li>
                        </>
                    }
                    {
                        !isLoggedIn && <li className="md:hidden block mb-2">
                            <a onClick={() => push(`/auth/login?p=${asPath}`)}><Icon className="text-xl" name="log-in" />Log in</a>
                        </li>
                    }

                    {
                        isLoggedIn && <>
                            <h5 className="md:hidden block">Gender</h5>
                            <hr className="mb-5 md:hidden block" />

                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/men' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/men')}><Icon className="text-xl" name="men" /> Men</a>
                            </li>
                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/women' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/women')}><Icon className="text-xl" name="women" /> Women</a>
                            </li>
                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/kid' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/kid')}><Icon className="text-xl" name="kid" /> Kids</a>
                            </li>

                        </>
                    }
                    {
                        isLoggedIn && user?.role === 'admin' && <>
                            <h5 className="md:hidden block">Admin Panel</h5>
                            <hr className="mb-5 md:hidden block" />
                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/kid' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/kid')}><Icon className="text-xl" name="men" />Products</a>
                            </li>
                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/kid' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/kid')}><Icon className="text-xl" name="orders" />Orders</a>
                            </li>
                            <li className="md:hidden block mb-2">
                                <a className={`${asPath === '/category/kid' ? 'bg-primary pointer-events-none text-black' : ''}`} onClick={() => push('/category/kid')}><Icon className="text-xl" name="users" />Users</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>

    )
}