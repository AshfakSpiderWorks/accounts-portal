import { get, post } from './../Config/config';

export const Departments = {

    get: (data) => get('departments', {params : data}),

}
