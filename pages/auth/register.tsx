import { useRouter } from "next/router"
import { AuthLayout } from "../../components"

const RegisterPage = () => {

    const router = useRouter()

    return (
        <AuthLayout title="Dev-Shop | Sign Up">
            <h1 className="text-5xl font-extrabold text-center my-5">Sign Up</h1>
            <section>
                <form className="flex flex-col max-w-xl mx-auto gap-5 shadow-black/60 shadow-2xl md:p-10 p-2 rounded-xl bg-base-300">
                    <div>
                        <label htmlFor="" className="mb-2 block font-bold">Full Name</label>
                        <input type="text" placeholder="example" className="input input-bordered text-xl w-full" />
                    </div>
                    <div>
                        <label htmlFor="" className="mb-2 block font-bold">E-mail</label>
                        <input type="email" placeholder="example@example.com" className="input input-bordered text-xl w-full" />
                    </div>
                    <div>
                        <label htmlFor="" className="mb-2 block font-bold">Password</label>
                        <input type="password" placeholder="****" className="input input-bordered text-xl w-full" />
                    </div>
                    <button className="btn mt-5 btn-accent">Log in</button>

                    <p className="text-end">Do you already have an account?
                        <span className="link link-secondary font-bold" onClick={() => router.push('/auth/login')}> Click here to log in</span></p>
                </form>
            </section>
        </AuthLayout>
    )
}
export default RegisterPage