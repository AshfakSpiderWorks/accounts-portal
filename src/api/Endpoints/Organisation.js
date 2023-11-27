import { get } from './../Config/config';

export const Organisations = {

    get: (data) => get('organisations', { params: data }),

}
