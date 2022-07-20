import type { NextPage } from 'next'
import { Overlay, ShopLayout } from '../components'
import { ILayoutShop } from '../interfaces'
import { initialData } from '../database/products';
import Image from 'next/image';

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

      <section className='grid grid-cols-3 gap-14 place-items-center my-14'>
        {
          initialData.products.slice(0, 11).map(({ images, slug, title }) => (
            <div key={slug} className="rounded w-full h-96">
              <figure className='w-full fade-in h-full block relative bg-neutral shadow-xl shadow-black/50' >
                <Image
                  src={`/products/${images[0]}`}
                  loading='lazy'
                  layout="fill"
                  className='object-cover rounded fade-in'
                  alt={title}
                />
              </figure>
            </div>
          ))
        }
      </section>
    </ShopLayout>
  )
}

export default Home
