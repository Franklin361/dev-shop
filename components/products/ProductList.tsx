import { IProduct } from "../../interfaces"
import { ProductCard } from "./ProductCard"

interface Props {
    data: IProduct[]
}

export const ProductList = ({ data = [] }: Props) => {
    return (

        <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 place-items-center my-14  px-5'>
            {
                data.slice(0, 5).map(product => (
                    <ProductCard
                        key={product.slug}
                        product={product}
                    />
                ))
            }
        </section>

    )
}