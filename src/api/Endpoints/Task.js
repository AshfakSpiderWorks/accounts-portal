import { get, post} from './../Config/config';

export const Task = {
    get: (data) => get(`/projects/tasks`, {params:data}),
    add: (data) => post('/projects/tasks/store', data),
    update: (data) => post(`/projects/tasks/update`,data),
    search: () => get(`/projects/tasks/search`),
    getDetails: (data) => get(`/projects/tasks/get-account`, {params:data}),
    getTaskDetails: (data) => get(`/projects/tasks/view`, {params:data}),
    changeStatus: (data) => get(`/projects/tasks/change-status`, {params:data}),
    getStatusHistory: (data) => get('projects/tasks/status-history',{params:data})
}
