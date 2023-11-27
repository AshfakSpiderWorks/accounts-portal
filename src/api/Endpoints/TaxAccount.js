import { get, post} from './../Config/config';

export const TaxAccount = {
    get: (data) => get(`/accounts/tax-accounts`, {params:data}),
    add: (data) => post('/accounts/tax-accounts/store', data),
    getDetails: (data) => get(`/accounts/tax-accounts/view?id=`, {params:data}),
    update: (data) => post(`/accounts/tax-accounts/update`,data),
    delete: (data) => get(`/accounts/tax-accounts/delete?id=`,{params:data})
}
