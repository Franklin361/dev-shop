import Link from "next/link"
import { Icon } from "../"

export const AdminNavBar = () => {

    return (
        <nav className="bg-black/90 shadow-2xl shadow-black/70 p-4 sticky top-0 left-0 z-30 flex justify-center items-center">
            <div className="flex-1 flex">
                <Link href='/admin/'>
                    <h4 className="cursor-pointer select-none"><b>Dev</b> | Shop</h4>
                </Link>
            </div>

            <div className="flex items-center justify-end gap-5 flex-1">

                <label htmlFor="my-drawer" className="drawer-button p-2  rounded cursor-pointer flex gap-2 hover:bg-white/20 ">
                    <span className="select-none">Menu</span>
                    <Icon className="text-2xl" name="menu" />
                </label>
            </div>
        </nav>
    )
}

