<template>
    <div>

        <div class="flex-row d-flex flex-wrap">
            <album-playlist-item class="col-lg-2 col-md-3 col-sm-4 col-6 item" v-for="item in albumsList" :album_playlist="item" @click.native="onAlbumClicked(item)" />
        </div>

        <div v-if="loading" class="loader loader-large"><div class="ball-rotate"><div></div></div></div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import { mapState, mapMutations, mapActions } from 'vuex';
    import AlbumPlaylistItem from "../components/AlbumPlaylistItem.vue";
    import EventBus from '../bus.js';

    export default {
        name: 'AllAlbumsList',
        components: {
            AlbumPlaylistItem,
        },
        data() {
            return {
                loading: false,
            }
        },
        beforeRouteEnter (to, from, next) {
            EventBus.$emit('toggle-go-back-button-in-header', true);

            next();
        },
        beforeRouteLeave (to, from, next) {
            EventBus.$emit('toggle-go-back-button-in-header', false);

            next();
        },
        computed: {
            ...mapState([
                'albumsList'
            ]),
        },
        methods: {
            ...mapActions([
                'loadAlbums'
            ]),
            onAlbumClicked(item) {
                this.$router.push({
                    name: 'Album',
                    params: {
                        album_playlist: item
                    }
                });
            }
        },
        created() {
            let self = this;

            if(this.albumsList.count <= 0) {
                self.loading = true;
            }

            this.loadAlbums().then(() => {
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

    .item {
        padding: 1rem;
    }

    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
