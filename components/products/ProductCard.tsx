import Image from "next/image"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { IProduct } from "../../interfaces"

interface Props {
    product: IProduct
}

export const ProductCard = ({ product }: Props) => {

    const [isHovered, setIsHovered] = useState(false);

    const router = useRouter()

    const productImg = useMemo(
        () => isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`
        , [product.images, isHovered])


    return (
        <div className="w-full h-full">
            <div
                className="rounded w-full h-96 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                // onClick={() => router.push(`/product/${product.slug}`)}
                onClick={() => router.push(`/product/slug`)}
            >
                <figure className='w-full fade-in h-full block relative bg-neutral shadow-xl shadow-black/50' >
                    <Image
                        src={productImg}
                        loading='lazy'
                        layout="fill"
                        className='object-cover rounded fade-in'
                        alt={product.title}
                        key={productImg}
                    />
                </figure>

            </div>
            <div className="p-2 pt-3 min-h-16 text-start">
                <h4 className="font-bold">{product.title}</h4>
                <p className="font-extrabold text-xl text-primary">$ {product.price}.00</p>
            </div>
        </div>
    )
}