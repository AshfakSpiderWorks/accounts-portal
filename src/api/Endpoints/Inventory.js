import { get, post} from './../Config/config';

export const Inventories = {
    list: (data) => get(`/api/inventory/items`, {params:data}),
    add: (data) => post('/api/inventory/items/store', data),
    update: (data) => post(`/api/inventory/items/update`,data),
    getDetails: (data) => get('/api/inventory/items/view?id=', { params: data }),
    delete: (data) => get('/api/inventory/items/delete?id=', { params: data }),
}