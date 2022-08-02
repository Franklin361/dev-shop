import { useRouter } from "next/router"
import { ShopLayout } from "../../components"

const HistoryPage = () => {

    const router = useRouter()

    return (
        <ShopLayout title="Dev-Shop | History" pageDesc="Order history of user's purchases" >
            <section className="my-8 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold px-5">History</h1>

                <div className="overflow-x-auto mt-5 border border-gray-500 rounded-lg">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Paid order</th>
                                <th>See order</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="hover">
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>
                                    <div className="badge badge-success badge-outline badge-lg">Paid</div>
                                </td>
                                <td> <p className="link link-secondary" onClick={() => router.push(`/order/${1}`)}>View order</p> </td>
                            </tr>

                            <tr className="hover">
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>
                                    <div className="badge badge-error badge-outline badge-lg">Not paid</div>
                                </td>
                                <td> <p className="link link-secondary" onClick={() => router.push(`/order/${1}`)}>View order</p> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </ShopLayout>
    )
}
export default HistoryPage