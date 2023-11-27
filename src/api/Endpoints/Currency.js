
import { get, post } from './../Config/config';

export const Currency = {

    get: (data) => get('/currencies?', {params : data}),
 
}
