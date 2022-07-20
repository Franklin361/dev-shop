import Link from "next/link"
import { Icon } from "./"

export const NavBar = () => {
    return (
        <nav className="bg-black/90 shadow-2xl shadow-black/70 p-5 sticky top-0 left-0 z-30 flex justify-center items-center">
            <div className="flex-1 flex">
                <Link href='/'>
                    <h4 className="cursor-pointer select-none">Dev Shop</h4>
                </Link>
            </div>

            <div className="md:flex hidden items-center flex-1 justify-center gap-5">
                <Link href='/category/men'>
                    <div className="flex flex-1 py-2 px-3 justify-center items-center gap-2 cursor-pointer rounded hover:bg-white/20">
                        <Icon name="men" className="text-3xl" />
                        <span className="select-none">Men</span>
                    </div>
                </Link>
                <Link href='/category/women'>
                    <div className="flex flex-1 py-2 px-3 justify-center items-center gap-2 cursor-pointer rounded hover:bg-white/20">
                        <Icon name="women" className="text-3xl" />
                        <span className="select-none">Women</span>
                    </div>
                </Link>
                <Link href='/category/kid'>
                    <div className="flex flex-1 py-2 px-3 justify-center items-center gap-2 cursor-pointer rounded hover:bg-white/20">
                        <Icon name="kid" className="text-3xl" />
                        <span className="select-none">Kid</span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center justify-end gap-5 flex-1">
                <Link href='/search'>
                    <div className="rounded-full hover:bg-white/20 cursor-pointer p-2">
                        <Icon name="search" className="text-3xl" />
                    </div>
                </Link>

                <Link href='/cart'>
                    <div className="indicator rounded-full p-2 hover:bg-white/20 cursor-pointer">
                        <span className="indicator-item badge badge-md badge-accent font-bold select-none">9+</span>
                        <Icon name="cart" className="text-3xl" />
                    </div>
                </Link>

                <label htmlFor="my-drawer" className="drawer-button p-2  rounded cursor-pointer flex gap-2 hover:bg-white/20">
                    <span className="lg:block hidden select-none">Menu</span>
                    <Icon className="text-2xl" name="menu" />
                </label>
            </div>
        </nav>
    )
}

