import { get, post } from './../Config/config';
export const Backlinks = {
    get: (data) => get(`/site-back-links`, { params: data }),
    add: (data) => post('/site-back-links/store', data),
    getBacklinksitestDetails: (data) => get(`/site-back-links/get-back-link`, { params: data }),
    update: (data) => post('/site-back-links/update', data),
    // search: (data) => get(`/accounts/search?`, { params: data }),
    // getDetails: (data) =>
    //     get(`/accounts/get-account`, { params: data })
}
