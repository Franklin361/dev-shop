import { ShopLayout } from "../../components"
import { countries, getDataFromCookies } from "../../utils"
import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useCartStore } from "../../store";
import { useEffect } from 'react';
import { useContextAuth } from "../../hooks";


type FormData = {
    name: string,
    lastName: string,
    address: string,
    address2?: string,
    zip: string,
    phone: string,
    country: string
    city: string
};

const defaultCounty = Cookie.get('country') ? Cookie.get('country') : 'MEX'

const AddressPage = () => {

    const router = useRouter()
    const { user } = useContextAuth()
    const { addShippingAddress } = useCartStore(({ addShippingAddress }) => ({ addShippingAddress }))
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            name: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            phone: '',
            country: countries[0].code,
            city: '',
        }
    });

    useEffect(() => {
        reset(getDataFromCookies())
    }, [])


    const onSuccess = async (form: FormData) => {
        addShippingAddress(form)
        router.push('/checkout/summary')
    }

    return (
        <ShopLayout
            title="Dev-Shop | User Address"
            pageDesc="Confirm user direction"
        >
            <section className="px-5 mb-5">
                <h1 className="my-8 text-3xl font-bold">Address</h1>
                <form onSubmit={handleSubmit(onSuccess)} className="md:grid md:grid-cols-2 flex flex-col gap-7 md:gap-5 max-w-6xl mx-auto">

                    <div className="flex flex-col md:gap-5 gap-7">
                        <div>
                            <input
                                type="text" placeholder="Name"
                                className={`input ${errors.name ? 'input-error' : 'input-bordered'} input-secondary w-full text-lg`}                             {
                                ...register('name', {
                                    required: 'This field is required',
                                })
                                }
                            />
                            {
                                errors.name && <p className="my-1 text-sm text-error">{errors.name.message}</p>
                            }
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Address"
                                className={`input ${errors.address ? 'input-error' : 'input-bordered'} input-secondary w-full text-lg`}
                                {...register('address', {
                                    required: 'This field is required',
                                })
                                }
                            />
                            {
                                errors.address && <p className="my-1 text-sm text-error">{errors.address.message}</p>
                            }
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                className={`input ${errors.zip ? 'input-error' : 'input-bordered'} input-secondary w-full text-lg`}
                                {...register('zip', {
                                    required: 'This field is required',
                                })
                                }
                            />
                            {
                                errors.zip && <p className="my-1 text-sm text-error">{errors.zip.message}</p>
                            }
                        </div>
                        <div>
                            <select
                                {
                                ...register('country', {
                                    required: 'This field is required',
                                })
                                }
                                className={`select ${errors.country ? 'select-error' : 'select-bordered'} select-secondary w-full text-lg`}
                            >
                                {
                                    countries.map(({ code, name }) => (
                                        <option
                                            value={code}
                                            key={code}
                                            defaultChecked={defaultCounty === code}
                                        >{name}</option>
                                    ))
                                }
                            </select>
                            {
                                errors.country && <p className="my-1 text-sm text-error">{errors.country.message}</p>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col md:gap-5 gap-7">
                        <div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`input ${errors.lastName ? 'input-error' : 'input-bordered'} input-secondary w-full text-lg`}
                                {
                                ...register('lastName', {
                                    required: 'This field is required',
                                })
                                }
                            />
                            {
                                errors.lastName && <p className="my-1 text-sm text-error">{errors.lastName.message}</p>
                            }
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Address 2 (optional)"
                                className={`input input-bordered input-secondary w-full text-lg`}
                                {...register('address2', { required: false })}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="City"
                                className={`input ${errors.city ? 'input-error' : 'input-bordered'} input-secondary w-full text-lg`}
                                {
                                ...register('city', {
                                    required: 'This field is required',
                                })
                                }
                            />
                            {
                                errors.city && <p className="my-1 text-sm text-error">{errors.city.message}</p>
                            }
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Phone"
                                className={`input ${errors.phone ? 'input-error' : 'input-bordered'} input-secondary w-full text-lg`}
                                {
                                ...register('phone', {
                                    required: 'This field is required',
                                })
                                }
                            />
                            {
                                errors.phone && <p className="my-1 text-sm text-error">{errors.phone.message}</p>
                            }
                        </div>
                    </div>
                    <div className="col-span-2 text-center mt-5">
                        {
                            user?.role !== 'admin' ?
                                <button type="submit" className="btn btn-primary md:w-auto w-full">Check order</button>
                                : <div className='alert alert-warning font-bold'>You are an admin, you cannot add your address</div>
                        }
                    </div>

                </form>

            </section>
        </ShopLayout>
    )
}
export default AddressPage



