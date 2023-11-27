import { get, post} from './../Config/config';

export const Activities = {
    get: (data) => get(`/projects/activities`, {params:data}),
    add: (data) => post('/projects/activities/store', data),
    update: (data) => post(`/projects/activities/update`,data),
    search: () => get(`/projects/activities/search`),
    getDetails: (data) => get(`/projects/activities/view`, {params:data})
}
