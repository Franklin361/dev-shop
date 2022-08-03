import type { NextPage } from 'next'
import { HeaderHome, ProductList, ShopLayout, Loading } from '../../components'
import { useProducts } from '../../hooks'
import { ILayoutShop } from '../../interfaces'

const headProps: ILayoutShop = {
    imgUrl: '',
    pageDesc: 'Find the best products for developers for the women!',
    title: 'Dev-Shop | Women'
}

const WomenPage: NextPage = () => {

    const { error, isLoading, data } = useProducts('/products?gender=women')

    if (error) return <div>failed to load</div>

    return (
        <ShopLayout {...headProps}>

            {/* <HeaderHome /> */}

            {
                isLoading
                    ? <Loading label='Loading products for Women...' textClass='my-5 block text-3xl text-accent font-bold fade-in infinite' />
                    : <ProductList data={data.products} />
            }
        </ShopLayout>
    )
}

export default WomenPage
