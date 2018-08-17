import axios from 'axios';

export default class API {

}

API.Lists = class {

    static home() {
        return axios.get('/get/home-page-collection');
    }

};