import Link from "next/link"
import { Icon } from "./"

export const NavBar = () => {
    return (
        <nav className="bg-black p-5 sticky top-0 left-0 z-30 flex justify-between items-center">
            <div className="flex-1">
                <Link href='/'>
                    <span>Dev Shop</span>
                </Link>
            </div>

            <div className="md:flex hidden items-center gap-16 flex-1 justify-center">
                <Link href='/category/men'>
                    <div className="flex items-center gap-2">
                        <Icon name="men" className="text-3xl" />
                        <span className="">Men</span>
                    </div>
                </Link>
                <Link href='/category/women'>
                    <div className="flex items-center gap-2">
                        <Icon name="women" className="text-3xl" />
                        <span className="">Women</span>
                    </div>
                </Link>
                <Link href='/category/kid'>
                    <div className="flex items-center gap-2">
                        <Icon name="kid" className="text-3xl" />
                        <span className="">Kid</span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center justify-end gap-9 flex-1">
                <Link href='/search'>
                    <div>
                        <Icon name="search" className="text-3xl" />
                    </div>
                </Link>

                <Link href='/cart'>
                    <div className="indicator">
                        <span className="indicator-item badge badge-md badge-secondary">9+</span>
                        <Icon name="cart" className="text-3xl" />
                    </div>
                </Link>

                <label htmlFor="my-drawer" className="drawer-button cursor-pointer flex gap-2">
                    <span className="lg:block hidden">Menu</span>
                    <Icon className="text-2xl" name="menu" />
                </label>
            </div>
        </nav>
    )
}