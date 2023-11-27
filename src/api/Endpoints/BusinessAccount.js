import { get, post} from './../Config/config';

export const BusinessAccount = {
    get: (data) => get(`/accounts/business-accounts`, {params:data}),
    add: (data) => post('/accounts/business-accounts/store', data),
    getDetails: (data) => get(`/accounts/business-accounts/view?id=`, {params:data}),
    update: (data) => post(`/accounts/business-accounts/update`,data),
    delete: (data) => get(`/accounts/business-accounts/delete?id=`,{params:data})
}
