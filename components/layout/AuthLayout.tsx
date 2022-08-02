import Head from "next/head"
import { Element } from "../../interfaces"

interface Props {
    title: string
    children: Element
}
export const AuthLayout = ({ title, children }: Props) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <main>
                {children}
            </main>
        </div>
    )
}