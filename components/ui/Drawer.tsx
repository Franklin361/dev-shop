import { Element } from "../../interfaces"

interface Props {
    children: Element
}

export const Drawer = ({ children }: Props) => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay backdrop-blur-sm" ></label>

                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content backdrop-filter">



                    <h5>Search</h5>
                    <hr />
                    <input type="text" placeholder="Name" className="input input-bordered input-secondary w-full text-lg my-5" />

                    <h5 className="md:hidden block">Gender</h5>
                    <hr className="mb-5 md:hidden block" />
                    <li className="md:hidden block"><a>Men</a></li>
                    <li className="md:hidden block"><a>Women</a></li>
                    <li className="md:hidden block"><a>Kids</a></li>

                </ul>
            </div>
        </div>

    )
}