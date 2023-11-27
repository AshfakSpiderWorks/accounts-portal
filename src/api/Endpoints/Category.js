import { get, post } from './../Config/config';
export const categories = {
    list: (data) => get(`/inventory/categories`, { params: data }),
    add: (data) => post('/inventory/categories/store', data),
    view: (data) => get(`/inventory/categories/view?id=`, { params: data }),
    delete: (data) => get('/inventory/categories/delete?id=',{ params: data }),
    update: (data) => post('/inventory/categories/update', data),
}