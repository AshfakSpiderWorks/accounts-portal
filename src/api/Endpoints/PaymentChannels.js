import { get, post} from './../Config/config';

export const Paymentchannels = {
    list: (data) => get(`/accounts/payment-channels`, {params:data}),
    add: (data) => post('/accounts/payment-channels/store', data),
    getDetails: (data) => get(`/accounts/payment-channels/view?id=`, {params:data}),
    update: (data) => post(`/accounts/payment-channels/update`,data),
    delete: (data) => get(`/accounts/payment-channels/delete?id=`,{params:data})
}



    


