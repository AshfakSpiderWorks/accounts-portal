import { get, post } from './../Config/config';

export const Project = {
    get: (data) => get(`/projects`, { params: data }),
    getEmployees: (data) => get(`/projects/employees`, { params: data }),

    assignEmployee: (data) => post('projects/employees/store', data),
    removeEmployee: (data) => get('projects/employees/delete', { params: data }),

    add: (data) => post('/projects/store', data),
    update: (data) => post(`/projects/update`, data),
    search: () => get(`/projects/search`),
    getDetails: (data) => get(`/projects/get-details?project_id=`, { params: data })
}
