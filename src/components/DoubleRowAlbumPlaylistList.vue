<template>

    <div class="d-flex" :id="listContainerId">
        <div class="scroll-button-container">
            <img class="left-scroll" src="../assets/icons/chevron-left.svg">
        </div>
        <div class="list-container">
            <div class="d-flex list">

                <div class="col-lg-2 col-sm-3 col-5 item" v-for="groupItem in groupedList">
                    <album-playlist-item class="album" v-for="item in groupItem" :album_playlist="item" @click.native="onAlbumPlaylistClicked(item)" />
                </div>

            </div>
        </div>
        <div class="scroll-button-container">
            <img class="right-scroll" src="../assets/icons/chevron-right.svg">
        </div>
    </div>

</template>

<script>
    import AlbumPlaylistItem from './AlbumPlaylistItem.vue';
    import Utilities from '../Utilities.js';
    import * as $ from 'jquery';

    export default {
        name: 'DoubleRowAlbumPlaylistList',
        components: {
            AlbumPlaylistItem
        },
        props: ['list'],
        data() {
            return {
                type: 'Album',
                listContainerId: null
            }
        },
        mounted() {
            let self = this;

            this.listContainerId = "x" + Math.random().toString(36).substr(2, 5);

            $(document).ready(function () {
                let scrollWidth = $(`#${self.listContainerId} .album`).width();

                $(`#${self.listContainerId} .left-scroll`).click(function () {
                    $(`#${self.listContainerId} .list`).animate({
                        scrollLeft: `+=${scrollWidth}`
                    }, 100);
                });
                $(`#${self.listContainerId} .right-scroll`).click(function () {
                    $(`#${self.listContainerId} .list`).animate({
                        scrollLeft: `-=${scrollWidth}`
                    }, 100);
                });
            });
        },
        computed: {
            // a computed getter
            groupedList: function () {
                // `this` points to the vm instance
                return Utilities.chunkArrayByNumber(this.list, 2);
            }
        },
        created() {
            if(this.list[0].artist === undefined || this.list[0].artist == null) {
                this.type = 'Playlist';
            } else {
                this.type = 'Album';
            }
        },
        methods: {
            onAlbumPlaylistClicked(item) {
                this.$router.push({
                    name: this.type,
                    params: {
                        id: item._id.$oid,
                        album_playlist: item,
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .list {
        overflow-y: hidden;
        overflow-x: scroll;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        padding-top: 1rem;
        padding-bottom: 1rem;

        &::-webkit-scrollbar {
            display: none;
        }

        .item {
            padding: 0 1rem;
        }

        .item *:first-child {
            margin-bottom: 1rem;
        }

        .item:not(:first-child) {
            margin-left: -1rem;
        }
    }

    .scroll-button-container {
        width: 5vw; display: flex;
        justify-content: center;

        @media (max-width: 991px) {
            display: none !important;
        }

        img {
            width: 100%;
            cursor: pointer;
        }
    }

    .list-container {
        width: 90vw;

        @media (max-width: 991px) {
            width: 100vw;
        }
    }





    .scroll-button-container {
        width: 5vw; display: flex;
        justify-content: center;

        @media (max-width: 991px) {
            display: none !important;
        }

        img {
            width: 100%;
            cursor: pointer;
        }
    }

    .list-container {
        width: 90vw;

        @media (max-width: 991px) {
            width: 100vw;
        }
    }
</style>
