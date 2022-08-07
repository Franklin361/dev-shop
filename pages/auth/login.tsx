import { getProviders, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router"
import { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { devShopApi } from "../../api";
import { AuthLayout } from "../../components"
import { AuthContext } from "../../context";
import { isEmail } from "../../utils";

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [providers, setProviders] = useState<any>()

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])


    const onSuccess = async ({ email, password }: FormData) => {
        await signIn('credentials', { email, password })
    }

    const handleGoToRegister = () => {
        const destination = router.query.p?.toString()
        const url = destination ? `/auth/register?p=${destination}` : '/auth/register'
        router.push(url)
    }

    return (
        <AuthLayout title="Dev-Shop | Login">
            <h1 className="text-5xl font-extrabold text-center mt-10 mb-5">Log in</h1>
            <section>
                <form
                    className="flex flex-col max-w-xl mx-auto gap-5 shadow-black/60 shadow-2xl md:p-10 p-2 rounded-xl bg-base-300"
                    onSubmit={handleSubmit(onSuccess)}
                >
                    <div>
                        <label htmlFor="" className="mb-2 block font-bold">E-mail</label>
                        <input
                            type="email"
                            placeholder="example@example.com"
                            className={`input ${errors.email ? 'input-error' : 'input-bordered'} text-xl w-full`}
                            {
                            ...register('email', {
                                required: 'This field is required',
                                validate: isEmail
                            })
                            }
                        />
                        {
                            errors.email && <p className="my-1 text-sm text-error">{errors.email.message}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="" className="mb-2 block font-bold">Password</label>
                        <input
                            type="password"
                            placeholder="****"
                            className={`input ${errors.password ? 'input-error' : 'input-bordered'} text-xl w-full`}
                            {...register('password',
                                {
                                    required: 'This field is required',
                                    minLength: { value: 6, message: 'Min. 6 characters' }
                                }
                            )}
                        />
                        {
                            errors.password && <p className="my-1 text-sm text-error" >{errors.password.message}</p>
                        }
                    </div>
                    <button className="btn mt-5 btn-accent" type="submit">Log in</button>
                    {
                        Object.values(providers).map((provider: any) => {
                            if (provider.id === 'credentials') return <div key='credentials' />
                            return (
                                <button className="btn mt-5" key={provider.id} onClick={() => signIn(provider.id)}>{provider.name}</button>
                            )
                        })
                    }

                    <p className="text-end">Do not you have an account?
                        <span className="link link-secondary font-bold" onClick={handleGoToRegister}> Click here to get it</span></p>
                </form>
            </section>
        </AuthLayout>
    )
}
export default LoginPage


import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req })

    const { p = '/' } = ctx.query

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

