<template>

    <div class="d-flex" :id="listContainerId">
        <div class="scroll-button-container">
            <img class="left-scroll" src="../assets/icons/chevron-left.svg">
        </div>
        <div class="list-container">
            <div class="d-flex list">

                <div class="col-lg-3 col-sm-4 col-7 item" v-for="groupItem in groupedList">
                    <div class="flex-row flex-column">
                        <track-item class="col-12 track" v-for="item in groupItem" :track="item" @click.native="onTrackClicked(item)"/>
                    </div>
                </div>

            </div>
        </div>
        <div class="scroll-button-container">
            <img class="right-scroll" src="../assets/icons/chevron-right.svg">
        </div>
    </div>


</template>

<script>
    import TrackItem from '../components/TrackItem.vue';
    import Utilities from '../Utilities.js';
    import EventBus from '../bus.js';
    import * as $ from 'jquery';

    export default {
        name: 'TripleRowTracksList',
        components: {
            TrackItem
        },
        props: ['list'],
        computed: {
            // a computed getter
            groupedList: function () {
                return Utilities.chunkArrayByNumber(this.list, 3);
            }
        },
        data () {
            return {
                listContainerId: null
            }
        },
        mounted() {
            let self = this;

            this.listContainerId = "x" + Math.random().toString(36).substr(2, 5);

            $(document).ready(function () {
                let scrollWidth = $(`#${self.listContainerId} .track`).width();

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
        methods: {
            onTrackClicked(item) {
                let index = this.list.indexOf(item);
                EventBus.$emit('play-list-with-index', this.list, index);
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

        .track:first-child {
            margin-top: 0;
        }

        .track {
            height: 4rem;
            margin: 1rem 0;
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
