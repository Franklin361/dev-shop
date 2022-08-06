import Cookie from 'js-cookie';
import { InfoAddress } from '../interfaces';

export const getDataFromCookies = (): InfoAddress => {
    return {
        name: Cookie.get('name') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        phone: Cookie.get('phone') || '',
        country: Cookie.get('country') || '',
        city: Cookie.get('city') || '',
    }
}
