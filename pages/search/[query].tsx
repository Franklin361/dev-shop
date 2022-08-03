import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { ProductList, ShopLayout } from '../../components'
import { dbProducts } from '../../database'
import { ILayoutShop, IProduct } from '../../interfaces'

const headProps: ILayoutShop = {
    imgUrl: '',
    pageDesc: 'Find the best products for developers for the men!',
    title: 'Dev-Shop | Men'
}

interface Props {
    products: IProduct[]
    foundProducts: boolean
    query: string
}

const MenPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    return (
        <ShopLayout {...headProps}>
            <section className='my-10 px-5'>
                <h5 className='text-3xl font-bold my-5'>Search results </h5>
                {
                    !foundProducts && <p className='text-2xl'>No results with: <span className='font-bold text-info'>{query}</span></p>
                }
                <ProductList data={products} />
            </section>
        </ShopLayout>
    )
}

export default MenPage



export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { query } = ctx.params as { query: string }

    if (query.trim().length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            },
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0

    if (!foundProducts) products = await dbProducts.getAllProducts()

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}