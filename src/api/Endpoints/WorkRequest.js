import { get, post } from './../Config/config';

export const WorkRequest = {
    get: (data) => get('/projects/work-requests', { params: data }),
    add: (data) => post('/projects/work-requests/store', data),
    getWorkRequestDetails: (data) => get(`/projects/work-requests/view?`, { params: data }),
    update: (data) => post('/projects/work-requests/update', data)
}