import { get, post } from './../Config/config';

export const WorkOrders = {
    get: (data) => get('/projects/work-orders?', { params: data }),

} 