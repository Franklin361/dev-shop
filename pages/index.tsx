import type { NextPage } from 'next'
import { Overlay, ProductCard, ShopLayout } from '../components'
import { ILayoutShop } from '../interfaces'
import { initialData } from '../database/products';

const headProps: ILayoutShop = {
  imgUrl: '',
  pageDesc: 'Find the best products for developers!',
  title: 'Dev-Shop | Home'
}

// TODO: DOWNSIZE  IMAGE HEADER

const Home: NextPage = () => {
  return (
    <ShopLayout {...headProps}>
      <header className=' bg-[url("https://i.pinimg.com/736x/e7/b1/e2/e7b1e231979b4603ff0489f372998e74.jpg")] bg-center bg-no-repeat bg-cover min-h-[60vh] flex justify-center items-center flex-col gap-5 relative rounded-b-lg overflow-hidden'>

        <h1 className='font-normal text-8xl z-20'>
          <span className='font-extrabold'>Dev</span>
          Shop
        </h1>
        <h2 className='z-20 text-2xl'> Found all the products you need! </h2>
        <Overlay />

      </header>

      <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 place-items-center my-14 lg:px-0 px-5'>
        {
          initialData.products.slice(0, 11).map(product => (
            <ProductCard
              key={product.slug}
              product={product}
            />
          ))
        }
      </section>
    </ShopLayout>
  )
}

export default Home
