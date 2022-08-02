import { ShopLayout } from "../../components"

const AddressPage = () => {
    return (
        <ShopLayout
            title="Dev-Shop | User Address"
            pageDesc="Confirm user direction"
        >
            <section className="px-5 mb-5">
                <h1 className="my-8 text-3xl font-bold">Address</h1>
                <form className="md:grid md:grid-cols-2 flex flex-col gap-7 md:gap-5 max-w-6xl mx-auto">

                    <div className="flex flex-col md:gap-5 gap-7">
                        <input type="text" placeholder="Name" className="input input-bordered input-secondary w-full text-lg" />
                        <input type="text" placeholder="Address" className="input input-bordered input-secondary w-full text-lg" />
                        <input type="text" placeholder="Postal Code" className="input input-bordered input-secondary w-full text-lg" />
                        <select className="select select-bordered select-secondary w-full text-lg">
                            <option defaultChecked>--- Select a country --- </option>
                            <option value="1">Mexico</option>
                            <option value="2">New York</option>
                            <option value="3">Japan</option>
                            <option value="4">Greek</option>
                        </select>
                    </div>

                    <div className="flex flex-col md:gap-5 gap-7">
                        <input type="text" placeholder="Last Name" className="input input-bordered input-secondary w-full text-lg" />
                        <input type="text" placeholder="Address 2 (optional)" className="input input-bordered input-secondary w-full text-lg" />
                        <input type="text" placeholder="City" className="input input-bordered input-secondary w-full text-lg" />
                        <input type="text" placeholder="Phone" className="input input-bordered input-secondary w-full text-lg" />
                    </div>

                    <div className="col-span-2 text-center mt-5">
                        <button className="btn btn-primary md:w-auto w-full">Check order</button>
                    </div>
                </form>

            </section>
        </ShopLayout>
    )
}
export default AddressPage