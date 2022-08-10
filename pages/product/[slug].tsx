import { GetServerSideProps } from 'next'
import { ItemCounter, ProductSlideShow, ShopLayout, SizeSelector } from "../../components"
import { dbProducts } from "../../database"
import { ICartProduct, IProduct } from '../../interfaces'


interface Props {
  product: IProduct
}

const ProductPage = ({ product }: Props) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    quantity: 1,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    _id: product._id,
  })
  const addToCart = useCartStore(state => state.addProductToCart)
  const { user } = useContextAuth()
  const { push } = useRouter()

  const handleSelectSize = (size: ISize) => setTempCartProduct(prev => ({
    ...prev,
    size
  }))

  const handleChangeQuantity = (quantity: number) => {
    if (quantity === 0) return
    if (quantity === product.inStock + 1) return
    setTempCartProduct(prev => ({
      ...prev,
      quantity
    }))
  }

  const handleAddToCart = () => {
    if (!tempCartProduct.size) return;
    addToCart(tempCartProduct)
    push('/cart')
  }

  return (
    <ShopLayout
      imgUrl={product.images[0]}
      pageDesc={product.description}
      title={`Dev-Shop | ${product.title.slice(0, 20)}`}
    >
      <section className="my-12 max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-16 md:px-0 px-5">

        <ProductSlideShow images={product.images} />

        <div className="flex flex-col gap-7">
          <div>
            <h1 className="md:text-4xl text-2xl font-bold">{product.title}</h1>
            <h2 className="font-extrabold text-2xl text-primary">$ {product.price}.00</h2>
          </div>

          <div className="flex gap-2 flex-col">
            <p className="text-xl text-gray-400">Amount</p>
            <ItemCounter onChangeQuantity={handleChangeQuantity} quantity={tempCartProduct.quantity} />

            <p className="text-xl text-gray-400">Size</p>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={tempCartProduct.size}
              onSelectSize={handleSelectSize}
            />
          </div>

          {
            !(user?.role === 'admin') ? <button
              className={`btn btn-primary btn-circle btn-block ${!tempCartProduct.size ? 'pointer-events-none' : ''}`}
              disabled={(product.inStock === 0)}
              onClick={handleAddToCart}
            >
              {product.inStock === 0 ? 'Not avaible' : tempCartProduct.size ? 'Add to cart' : 'Select a size'}
            </button>
              : <div className='alert alert-warning font-bold'>You are an admin, you cannot select a product</div>
          }


          <p>{product.description}</p>
        </div>
      </section>
    </ShopLayout>
  )
}
export default ProductPage



import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbProducts.getAllProductsSlug();

  return {
    paths: slugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}

import { GetStaticProps } from 'next'
import { useState } from 'react';
import { ISize } from '../../interfaces/product';
import { useRouter } from 'next/router'
import { useCartStore } from '../../store'
import { useContextAuth } from '../../hooks'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string }

  const product = await dbProducts.getProductsBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}
