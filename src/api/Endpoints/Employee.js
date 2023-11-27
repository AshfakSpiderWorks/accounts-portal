import { get, post } from './../Config/config';

export const Employee = {
    get: (data) => get(`/employees`, { params: data }),
    add: (data) => post('/employees/store', data),
    update: (data) => post(`/employees/update`, data),
    search: () => get(`/employees/search`),
    getDetails: (data) => get(`/employees/get-account`, { params: data }),
    getRoles: (data) => get(`/employee-roles`, { params: data }),
    getEmployeeDetails: (data) => get(`/employees/view?id=`, { params: data } ),

    checkAttendence: (data) => get('employees/check-attendence', { params: data }),
    getAttendanceList: (data) => get('employees/attendences', { params: data }),
    getNotSignedInList: (data) => get('employees/attendences-not-signed-in', { params: data }),
    signIn: (data) => post('employees/sign-in', data),
    signOut: (data) => post('employees/sign-out', data),
}
