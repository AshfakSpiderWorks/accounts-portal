import { get, post } from './../Config/config';

export const Organisations = {

    get: (data) => get('organisations', {params : data}),

}
