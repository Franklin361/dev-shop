import { GetServerSideProps } from 'next'
import { ItemCounter, ProductSlideShow, ShopLayout, SizeSelector } from "../../components"
import { dbProducts } from "../../database"
import { IProduct } from '../../interfaces'


interface Props {
  product: IProduct
}

const ProductPage = ({ product }: Props) => {

  return (
    <ShopLayout
      imgUrl={product.images[0]}
      pageDesc={product.description}
      title={`Dev-Shop | ${product.title.slice(0, 20)}`}
    >
      <section className="mt-12 max-w-6xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-16 lg:px-0 px-5">

        <ProductSlideShow images={product.images} />

        <div className="flex flex-col gap-7">
          <div>
            <h1 className="md:text-4xl text-2xl font-bold">{product.title}</h1>
            <h2 className="font-extrabold text-2xl text-primary">$ {product.price}.00</h2>
          </div>

          <div className="flex gap-2 flex-col">
            <p className="text-xl text-gray-400">Amount</p>
            <ItemCounter />
            <p className="text-xl text-gray-400">Size</p>
            <SizeSelector sizes={product.sizes} selectedSize={'L'} />
          </div>

          <button className="btn btn-primary btn-circle btn-block" disabled={(product.inStock === 0)} >
            {product.inStock === 0 ? 'No product' : 'Add to cart'}
          </button>

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
