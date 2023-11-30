import { get, post } from './../Config/config';


export const VendorPayments = {
    vendors: (data) => get('/inventory/vendors/list', { params: data }),

    get: (data) => get('/accounts/vendor-payments', { params: data }),
    add: (data) => post('/accounts/vendor-payments/store', data),
    update: (data) => post('/accounts/vendor-payments/update', data),
    getDetails: (data) => get('/accounts/vendor-payments/view?id=', { params: data }),
    delete: (data) => get('/accounts/vendor-payments/delete?id=', { params: data })
}
