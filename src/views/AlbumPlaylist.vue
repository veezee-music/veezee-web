<template>
    <div>

        <div class="row" style="margin: 0">

            <div class="col-xl-2 col-lg-1 col-2 hidden-md-down"></div>
            <div class="col-xl-4 col-lg-5 col-md-6 col-12 left-side">
                <div class="row artwork-container">
                    <div class="col-lg-12 col-md-12 col-6">
                        <img :src="album_playlist.image">
                    </div>
                    <div class="hidden-md-up col-6">
                        <div class="row">
                            <h3 class="title">{{ album_playlist.title }}</h3>
                        </div>
                        <div class="row" v-if="album_playlist.artist">
                            <h4 class="artist">{{ album_playlist.artist.name }}</h4>
                        </div>
                    </div>
                </div>
                <div class="row album-playlist-info-container hidden-sm-down">
                    <div class="col-12 text-left">
                        {{ album_playlist.tracks.length }} Songs, {{ type }}
                    </div>
                </div>
                <div class="row play-buttons-container">
                    <div class="col-6">
                        <button @click="playClicked()">
                            <img src="../assets/icons/play.svg">
                            <span>Play</span>
                        </button>
                    </div>
                    <div class="col-6">
                        <button @click="shuffleClicked()">
                            <img src="../assets/icons/shuffle.svg">
                            <span>Shuffle</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-5 col-md-6 col-12 right-side">
                <div class="row title-container hidden-sm-down">
                    <h3 class="title">{{ album_playlist.title }}</h3>
                </div>
                <div class="row artist-container hidden-sm-down" v-if="album_playlist.artist">
                    <h4 class="artist">{{ album_playlist.artist.name }}</h4>
                </div>
                <div class="row tracks-list">
                    <div v-for="(item, index) in album_playlist.tracks" class="col-12 track" @click="trackClicked(index)">
                        <h6 style="margin: 0; color: white;"><span class="track-number" style="margin-right: 2rem;">{{ index + 1 }}</span><span class="track-title">{{ item.title }}</span></h6>
                    </div>
                </div>
            </div>
            <div class="col-xl-2 col-lg-1 col-2 hidden-md-down"></div>

        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import { mapState, mapMutations, mapActions } from 'vuex';
    import Utilities from '../Utilities.js';
    import EventBus from '../bus.js';

    export default {
        name: 'AlbumPlaylist',
        components: {
        },
        props: ['album_playlist'],
        data() {
            return {
                loading: false,
                type: 'Album',
                containerWithoutTracks: {}
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
                'homePageList'
            ]),
        },
        methods: {
            ...mapActions([
                'loadHomePageList'
            ]),
            trackClicked(index) {
                EventBus.$emit('play-list-with-index', this.album_playlist.tracks, index);
            },
            playClicked() {
                EventBus.$emit('play-list-with-index', this.album_playlist.tracks, 0);
            },
            shuffleClicked() {
                let shuffledArray = Utilities.shuffleArray(this.album_playlist.tracks);
                EventBus.$emit('play-list-with-index', shuffledArray, 0);
            },
            fixAlbumsList() {
                for(let item of this.album_playlist.tracks) {
                    item.album = this.containerWithoutTracks;
                }
            }
        },
        created() {
            let self = this;

            this.type = this.$route.name;

            let listCopy = JSON.parse(JSON.stringify(this.album_playlist));
            listCopy.tracks = [];
            this.containerWithoutTracks = listCopy;

            if(this.type === 'Album') {
                this.fixAlbumsList();
            }


            // if(this.homePageList.count <= 0) {
            //     self.loading = true;
            // }
            //
            // this.loadHomePageList().then(() => {
            //     // done
            // }).catch(error => {
            //     console.log(error)
            // }).then(() => {
            //     self.loading = false;
            // });
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .play-buttons-container {
        padding: 0 4rem;

        button {
            width: 100%;
            background-color: black;
            border-radius: .3rem;
            border: 1px solid #ffffff;
            display: inline-flex;
            justify-content: space-evenly;
            padding: .5rem 0;
            cursor: pointer;

            span {
                color: #ffffff;
            }
        }

        // 576
        @media (max-width: 768px) {
            padding: .5rem 1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;

            button {
                padding: .3rem 0;
                min-width: 6rem;
            }
        }
    }

    .title {
        color: $primary-text-color;
        font-weight: 600;
        font-size: 1.75rem;
        text-align: left;

        @media (max-width: 576px) {
            font-size: 1.2rem;
        }
    }

    .artist {
        color: $secondary-text-color;
        font-size: 1.5rem;
        text-align: left;

        @media (max-width: 576px) {
            font-size: 1rem;
        }
    }

    .artwork-container {
        padding: 0 3rem;

        img {
            width: 100%;
            border-radius: .3rem;
        }

        @media (max-width: 768px) {
            padding: 0 1rem;
        }
    }

    .album-playlist-info-container {
        padding: .5rem 3rem;
        margin-bottom: .5rem;

        @media (max-width: 576px) {
            padding: .5rem 1rem;
        }

        * {
            color: $primary-text-color;
        }
    }

    .left-side, .right-side {
        height: fit-content;
    }

    .right-side > .tracks-list {
        margin-top: 5rem;

        @media (max-width: 768px) {
            margin-top: 0;
        }
    }

    .title-container, .artist-container {
        margin: 0;
    }

    .tracks-list .track {
        text-align: left;
        padding: 1.3rem 0;
        border-top: 1px solid white;
        cursor: pointer;

        @media (max-width: 768px) {
            h6 {
                padding-left: 2rem;
                padding-right: 2rem;
            }
        }
    }

    .tracks-list {
        margin: 0;

        @media (max-width: 768px) {
            margin: -15px;
        }
    }
</style>
