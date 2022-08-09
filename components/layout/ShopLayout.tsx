import Head from "next/head"

import { NavBar, Drawer } from "../"

import { ILayoutShop } from "../../interfaces"

interface Props extends ILayoutShop {
    children: JSX.Element | JSX.Element[]
}

export const ShopLayout = ({ children, title = 'Dev Shop', imgUrl, pageDesc = '' }: Props) => {
    return (
        <>
            <Head>
                <meta name="description" content={pageDesc} />
                <meta name="og:title" content={pageDesc} />
                <meta name="twitter:description" content={pageDesc} />
                {
                    imgUrl && <>
                        <meta property="og:image" content={imgUrl} />
                        <meta name="twitter:image" content={imgUrl} />
                    </>
                }
                <title>{title}</title>
            </Head>

            <Drawer>
                <NavBar />

                <main className="mx-auto w-full max-w-screen-xl">
                    {children}
                </main>

                <footer></footer>
            </Drawer>
        </>
    )
}