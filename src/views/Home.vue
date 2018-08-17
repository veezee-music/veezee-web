<template>
    <div>

        <div v-if="!loading" class="flex-row" v-for="item in homePageList">

            <div v-if="item.type === 'Header'" class="list-header d-flex"></div>
            <headers-list v-if="item.type === 'Header'" :list="item.headerList"/>

            <div v-if="item.type === 'Genre'" class="list-header d-flex">
                <div class="col text-left">
                    <h4>{{ item.title }}</h4>
                </div>
            </div>
            <genres-list v-if="item.type === 'Genre'" :list="item.genreList"/>

            <div v-if="item.type === 'Track'" class="list-header d-flex">
                <div class="col text-left">
                    <h4>{{ item.title }}</h4>
                </div>
                <div class="col text-right">
                    <router-link to="/tracks" class="see-all">See All</router-link>
                </div>
            </div>
            <triple-row-tracks-list v-if="item.type === 'Track'" :list="item.trackList"/>

            <div v-if="item.type === 'Album'" class="list-header d-flex">
                <div class="col text-left">
                    <h4>{{ item.title }}</h4>
                </div>
                <div class="col text-right">
                    <router-link :to="item.albumList[0].artist == null ? '/playlists' : '/albums'" class="see-all">See All</router-link>
                </div>
            </div>
            <double-row-album-playlist-list v-if="item.type === 'Album'" :list="item.albumList"/>

        </div>

        <div v-if="loading" class="loader loader-large"><div class="ball-rotate"><div></div></div></div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import DoubleRowAlbumPlaylistList from '../components/DoubleRowAlbumPlaylistList.vue';
    import TripleRowTracksList from '../components/TripleRowTracksList.vue';
    import HeadersList from '../components/HeadersList.vue';
    import GenresList from "../components/GenresList";
    import { mapState, mapMutations, mapActions } from 'vuex';

    export default {
        name: 'Home',
        components: {
            GenresList,
            DoubleRowAlbumPlaylistList,
            TripleRowTracksList,
            HeadersList
        },
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapState([
                'homePageList'
            ]),
        },
        methods: {
            ...mapActions([
                'loadHomePageList'
            ]),
        },
        created() {
            let self = this;

            if(this.homePageList.count <= 0) {
                self.loading = true;
            }

            this.loadHomePageList().then(() => {
                // done
            }).catch(error => {
                console.log(error)
            }).then(() => {
                self.loading = false;
            });
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .list-header {
        padding: 1rem 1rem 0;
        text-align: left;
        align-items: center;

        .col {
            padding: 0;
        }

        h4 {
            font-weight: 600;
            margin-bottom: 0;
            color: $primary-text-color;
        }

        .see-all {
            margin-bottom: 0;
            color: $primary-text-color;
        }
    }

    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
