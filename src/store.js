import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        homePageList: [],
        albumsList: [],
        playlistsList: []
    },
    mutations: {
        SET_HOME_PAGE_LISTS: (state, lists) => {
            state.homePageList = lists;
        },
        SET_ALBUMS_LIST: (state, lists) => {
            state.albumsList = lists;
        },
        SET_PLAYLISTS_LIST: (state, lists) => {
            state.playlistsList = lists;
        },
    },
    actions: {
        loadHomePageList ({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('/get/home-page-collection').then(response => {
                    // success
                    commit('SET_HOME_PAGE_LISTS', response.data);
                    resolve();
                }).catch(error => {
                    // error
                    reject(error);
                });
            })
        },
        loadAlbums ({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('/get/albums').then(response => {
                    // success
                    commit('SET_ALBUMS_LIST', response.data);
                    resolve();
                }).catch(error => {
                    // error
                    reject(error);
                });
            })
        },
        loadPlaylists ({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('/get/playlists').then(response => {
                    // success
                    commit('SET_PLAYLISTS_LIST', response.data);
                    resolve();
                }).catch(error => {
                    // error
                    reject(error);
                });
            })
        }
    }
})
