import { get, post } from './../Config/config';

export const Attendences = {

    all: (data) => get('employees/attendences', {params : data}),
    getDetails: (data) => get('employees/check-attendence', {params : data}),
    notSignOut: (data) => post('employees/attendences-not-signed_out', data),

}
