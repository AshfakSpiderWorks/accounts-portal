import { get, post } from './../Config/config';

export const EditProfile = {
    get: (data) => get('user', { params: data })
}