import { get, post } from './../Config/config';

export const Account = {
    get: (data) => get(`/accounts`, { params: data }),
    add: (data) => post('/accounts/store', data),
    update: (data) => post(`/accounts/update`, data),
    search: (data) => get(`/accounts/search?`, { params: data }),
    getDetails: (data) => get(`/accounts/get-account`, { params: data })
}
