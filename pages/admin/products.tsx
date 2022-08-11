import useSWR from "swr";
import { AdminLayout, CollapseItem, HeaderAdmin, Icon } from "../../components";
import { IProduct } from "../../interfaces";
import { useRouter } from 'next/router';

const ProductsPage = () => {
    const { push } = useRouter()
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');

    if (!data && !error) return (<></>);

    return (
        <AdminLayout title="Dev Shop | Admin - Products">
            <HeaderAdmin icon="products" title="Products" subtitle="Product maintenance" color="primary" />

            <div className='mb-10 w-full sticky top-24 flex justify-end z-10'>
                <button className='btn btn-info gap-3 font-bold md:w-auto w-full' onClick={() => push('/admin/products/new')}>
                    <Icon name='board' className='text-3xl' />
                    <span>Create a product</span>
                </button>
            </div>

            <div className="flex flex-col gap-5">
                {
                    data && data?.length !== 0
                        ?
                        data.map(product => (
                            <CollapseItem key={product._id} title={product.title}>
                                <hr />
                                <div className="fade-in-up px-3 py-5 gap-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">

                                    <div className="flex md:items-start items-center flex-row gap-2">
                                        <span>Gender product:</span>
                                        <span className="font-bold">{product.gender}</span>
                                    </div>
                                    <div className="flex md:items-start items-center flex-row gap-2">
                                        <span>Type product:</span>
                                        <span className="font-bold">{product.type}</span>
                                    </div>
                                    <div className="flex md:items-start items-center flex-row gap-2">
                                        <span>In stock:</span>
                                        <span className="font-bold"> {product.inStock}</span>
                                    </div>
                                    <div className="flex md:items-start items-center flex-row gap-2">
                                        <span>Price product:</span>
                                        <span className="font-bold">$ {product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex md:items-start items-center flex-row gap-2">
                                        <span>Sizes product:</span>
                                        <span className='font-bold'>{product.sizes.join(', ')}</span>
                                    </div>
                                </div>
                                <div className='px-3 pb-5'>
                                    <p className="btn w-full btn-accent" onClick={() => push(`/admin/products/${product.slug}`)}>Edit this product</p>
                                </div>
                            </CollapseItem>
                        ))
                        : <div className='rounded-full w-full p-3 bg-accent text-center'>
                            <span className='font-bold w-full text-2xl text-black'>No products</span>
                        </div>

                }
            </div>

        </AdminLayout>
    )
}
export default ProductsPage