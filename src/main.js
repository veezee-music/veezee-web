import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import axios from 'axios';
import Constants from './Constants.js';
import VueVisible from 'vue-visible';

Vue.use(VueVisible);

Vue.config.productionTip = false;

// these are components from external sources
// without this piece, we'll have build errors
// Vue.config.ignoredElements = [
//     'ion-icon'
// ];

axios.defaults.baseURL = Constants.API_BASE_URL;
// set up authentication header on every axios request if token is present
// if (localStorage.getItem('auth_token')) {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');
// }
// axios.interceptors.response.use((response) => {
//     return response;
// }, function (error) {
//     // Do something with response error
//     if (error.response.status === 401) {
//         console.log('unauthorized, logging out ...');
//         auth.logout();
//         router.replace('/auth/login');
//     }
//     return Promise.reject(error.response);
// });
//
// router.beforeEach((to, from, next) => {
//     if (!auth.checkAuth()) {
//         // let addressBarTokensResult = auth.readTokensFromAddressBar();
//         // if (addressBarTokensResult !== false) {
//         //     // try to save the token info
//         //     auth.saveTokensFromAddressBar(addressBarTokensResult, true);
//         // }
//     }
//     next();
// });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');