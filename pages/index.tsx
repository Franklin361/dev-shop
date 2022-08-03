import type { NextPage } from 'next'
import { HeaderHome, ProductList, ShopLayout, Loading } from '../components'
import { useProducts } from '../hooks'
import { ILayoutShop } from '../interfaces'

const headProps: ILayoutShop = {
  imgUrl: '',
  pageDesc: 'Find the best products for developers!',
  title: 'Dev-Shop | Home'
}

const HomePage: NextPage = () => {

  const { error, isLoading, data } = useProducts('/products')

  if (error) return <div>failed to load</div>

  return (
    <ShopLayout {...headProps}>

      <HeaderHome />
      {
        isLoading
          ? <Loading label='Loading products...' textClass='my-5 block text-3xl text-accent font-bold fade-in infinite' />
          : <ProductList data={data.products} />
      }
    </ShopLayout>
  )
}

export default HomePage
