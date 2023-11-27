import { get, post } from './../Config/config';

export const Files = {

    store: (data) => post('file-upload', data),

}
