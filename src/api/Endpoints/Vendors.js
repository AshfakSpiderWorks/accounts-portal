import { get, post } from './../Config/config';


export const VendorsApi = {
    list: (data) => get('/api/inventory/vendors', { params: data }),
    add: (data) => post('/api/inventory/vendors/store', data),
    update: (data) => post('/api/inventory/vendors/update', data),
    getDetails: (data) => get('/api/inventory/vendors/view?id=', { params: data }),
    delete: (data) => get('/api/inventory/vendors/delete?id=', { params: data }),
}

