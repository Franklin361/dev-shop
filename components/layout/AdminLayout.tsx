import Head from 'next/head';
import { Drawer, AdminNavBar } from '../';
import { ILayoutShop } from "../../interfaces"

interface Props extends ILayoutShop {
    children: JSX.Element | JSX.Element[]
}

export const AdminLayout = ({ children, title = 'Dev Shop | Admin' }: Props) => {
    return (
        <div>

            <Head>
                <title>{title}</title>
            </Head>
            <Drawer>
                <AdminNavBar />

                <main className="mx-auto w-full max-w-screen-xl">
                    {children}
                </main>
            </Drawer>
        </div>
    )
}