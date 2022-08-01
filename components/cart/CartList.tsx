import { Fragment } from 'react';
import Image from 'next/image';


import { ItemCounter, Icon } from "../";
import { initialData } from "../../database/products"
import { useRouter } from 'next/router';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
]

interface Props {
    isEdit?: boolean
}

export const CartList = ({ isEdit = false }: Props) => {

    const router = useRouter()

    return (
        <div className='my-10'>
            {
                productsInCart.map((product, index) => (
                    <Fragment key={product.slug}>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">

                            <div className="h-32 md:w-3/4 w-5/12 mx-auto relative">

                                <Image
                                    onClick={() => router.push(`/product/slug`)}
                                    src={`/products/${product.images[0]}`}
                                    layout="fill"
                                    className="rounded object-cover cursor-pointer"
                                />

                            </div>

                            <div className='flex flex-col gap-1'>
                                <b>{product.title}</b>
                                <p>Size: <b>M</b></p>
                                {
                                    isEdit
                                        ? <ItemCounter size='sm' />
                                        : <b className='text-info'>3 items</b>
                                }
                            </div>

                            <div>
                                <div className='w-full h-full center relative md:flex-row flex-col md:gap-0 gap-2'>
                                    <p> <span className='md:hidden inline'>Price: </span> $<span className='font-extrabold text-lg'> {product.price}.00</span></p>
                                    {
                                        isEdit && <button className='btn btn-error md:btn-circle btn-block btn-outline md:absolute md:-right-2 md:-top-2'>
                                            <Icon name='delete' className='text-2xl' />
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            (index !== productsInCart.length - 1) && <hr className='block my-5 border-gray-500' />
                        }
                    </Fragment>
                ))
            }
        </div>
    )
}