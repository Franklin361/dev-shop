import type { NextPage } from 'next'
import { HeaderHome, ProductList, ShopLayout, Loading } from '../../components'
import { useProducts } from '../../hooks'
import { ILayoutShop } from '../../interfaces'

const headProps: ILayoutShop = {
    imgUrl: '',
    pageDesc: 'Find the best products for developers for the men!',
    title: 'Dev-Shop | Men'
}

const MenPage: NextPage = () => {

    const { error, isLoading, data } = useProducts('/products?gender=men')

    if (error) return <div>failed to load</div>

    return (
        <ShopLayout {...headProps}>

            {/* <HeaderHome /> */}

            {
                isLoading
                    ? <Loading label='Loading products for Men...' textClass='my-5 block text-3xl text-accent font-bold fade-in infinite' />
                    : <ProductList data={data.products} />
            }
        </ShopLayout>
    )
}

export default MenPage
