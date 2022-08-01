import { ItemCounter, ProductSlideShow, ShopLayout, SizeSelector } from "../../components"
import { initialData } from "../../database/products"

const product = initialData.products[0];

const ProductPage = () => {
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