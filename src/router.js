import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import AllAlbumsList from './views/AllAlbumsList.vue';
import AllPlaylistsList from './views/AllPlaylistsList.vue';
import AlbumPlaylist from './views/AlbumPlaylist.vue';
import Search from './views/Search.vue';
import EventBus from './bus.js';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/albums',
            name: 'AllAlbumsList',
            component: AllAlbumsList
        },
        {
            path: '/playlists',
            name: 'AllPlaylistsList',
            component: AllPlaylistsList
        },
        {
            path: '/album/:id',
            name: 'Album',
            component: AlbumPlaylist,
            props: true
        },
        {
            path: '/playlist/:id',
            name: 'Playlist',
            component: AlbumPlaylist,
            props: true
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        }
    ]
})
