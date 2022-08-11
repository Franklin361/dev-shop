import Image from "next/image"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { IProduct } from "../../interfaces"
import { Chip, Icon } from "../ui"

interface Props {
    product: IProduct
}

export const ProductCard = ({ product }: Props) => {

    const [isHovered, setIsHovered] = useState(false);

    const router = useRouter()

    const productImg = useMemo(
        () => isHovered
            ? `${product.images[1]}`
            : `${product.images[0]}`
        , [product.images, isHovered])


    return (
        <div className="w-full h-full">
            <div
                className="rounded w-full h-96 cursor-pointer relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => router.push(`/product/${product.slug}`)}
            >
                {
                    product.inStock === 0 &&
                    <Chip
                        className="gap-1 absolute top-0 z-10 left-3"
                        icon="less"
                        label="Not available"
                        isOutline={false}
                    />
                }
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


