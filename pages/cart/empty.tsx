import { ShopLayout } from "../../components"
import Link from 'next/link';

const EmptyPage = () => {
    return (
        <ShopLayout
            title="Dev-Shop | Cart"
        >
            <section className="p-5 flex justify-center flex-col items-center gap-5 text-center">
                <span className="text-9xl font-extrabold text-accent">Ups!</span>
                <span className="text-5xl font-bold text-accent">Your cart is empty</span>
                <span className="text-5xl font-bold text-accent">Go to home and select some products!</span>
                <Link href='/'>
                    <button className="btn">Go Back</button>
                </Link>
            </section>
        </ShopLayout>
    )
}
export default EmptyPage