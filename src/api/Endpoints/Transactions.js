import { get, post} from './../Config/config';

export const TransactionsApi = {
    get: (data) => get(`/accounts/transactions`, {params:data}),
    add: (data) => post('/accounts/transactions/store', data),
    getDetails: (data) => get(`/accounts/transactions/view?id=`, {params:data}),
    update: (data) => post(`/accounts/transactions/update`,data),
    delete: (data) => get(`/accounts/transactions/delete?id=`,{params:data})
}
