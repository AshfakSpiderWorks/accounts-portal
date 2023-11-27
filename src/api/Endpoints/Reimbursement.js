import { get, post} from './../Config/config';

export const ReimbursementApi = {
    list: (data) => get(`/accounts/reimbursements`, {params:data}),
    add: (data) => post('/accounts/reimbursements/store', data),
    getDetails: (data) => get(`/accounts/reimbursements/view?id`, {params:data}),
    update: (data) => post(`/accounts/reimbursements/update`,data),
    delete: (data) => get(`/accounts/reimbursements/delete?id=`,{params:data})
}



    


