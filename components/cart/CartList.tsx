import { Fragment } from 'react';
import Image from 'next/image';


import { ItemCounter, Icon } from "../";
import { useRouter } from 'next/router';
import { useCartStore } from '../../store';
import { ICartProduct, IOrderItem } from '../../interfaces';


interface Props {
    isEdit?: boolean
    products?: IOrderItem[]
}

export const CartList = ({ isEdit = false, products }: Props) => {

    const productsInCart = useCartStore(state => state.cart)
    const deleteProductFromCart = useCartStore(state => state.deleteProductFromCart)
    const updateCartQuantity = useCartStore(state => state.updateCartQuantity)

    const router = useRouter()

    const handleQuantity = (product: ICartProduct, newValue: number) => {
        if (newValue <= 0) product.quantity = 1
        else if (newValue >= 10) product.quantity = 9
        else product.quantity = newValue

        updateCartQuantity(product)
    }

    const productsToShow = products ? products : productsInCart

    return (
        <div className='my-10'>
            {
                productsToShow.map((product, index) => (
                    <Fragment key={product.slug + product.size}>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">

                            <div className="h-32 md:w-3/4 w-5/12 mx-auto relative">

                                <Image
                                    onClick={() => router.push(`/product/${product.slug}`)}
                                    src={`${product.image}`}
                                    layout="fill"
                                    className="rounded object-cover cursor-pointer"
                                />

                            </div>

                            <div className='flex flex-col gap-1'>
                                <b>{product.title}</b>
                                <p>Size: <b>{product.size}</b></p>
                                {
                                    isEdit
                                        ? <ItemCounter
                                            size='sm'
                                            quantity={product.quantity}
                                            onChangeQuantity={(value) => handleQuantity(product as ICartProduct, value)}
                                        />
                                        : <b className='text-info'>{product.quantity} {product.quantity <= 1 ? 'item' : 'items'}</b>
                                }
                            </div>

                            <div>
                                <div className='w-full h-full center relative md:flex-row flex-col md:gap-0 gap-2'>
                                    <p> <span className='md:hidden inline'>Price: </span> $<span className='font-extrabold text-lg'> {product.price}.00</span></p>
                                    {
                                        isEdit && <button className='btn btn-error md:btn-circle btn-block btn-outline md:absolute md:-right-2 md:-top-2' onClick={() => deleteProductFromCart(product._id, product.size!)}>
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