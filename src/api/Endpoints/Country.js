import { get, post } from './../Config/config';

export const Country = {

    get: (data) => get('/countries?keyword=', {params : data}),
 
}
