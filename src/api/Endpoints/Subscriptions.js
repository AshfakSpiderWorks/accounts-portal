import { get, post} from './../Config/config';

export const SubscriptionsApi = {
    list: (data) => get(`/accounts/subscriptions`, {params:data}),
    add: (data) => post('/accounts/subscriptions/store', data),
    getDetails: (data) => get(`/accounts/subscriptions/view?id=`, {params:data}),
    update: (data) => post(`/accounts/subscriptions/update`,data),
    delete: (data) => get(`/accounts/subscriptions/delete?id=`,{params:data})
}