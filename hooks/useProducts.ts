import useSWR, { SWRConfiguration } from 'swr'
import { IProduct } from '../interfaces/product';

interface ResponseAPI {
    products: IProduct[]
}

export const useProducts = (url: string, config: SWRConfiguration = {}) => {

    const { data, error } = useSWR<ResponseAPI>(`/api${url}`, config)

    return {
        data: data || { products: [] },
        isLoading: !error && !data,
        error
    }
}