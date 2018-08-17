<template>

    <div class="d-flex" :id="listContainerId">
        <div class="scroll-button-container">
            <img class="left-scroll" src="../assets/icons/chevron-left.svg">
        </div>
        <div class="list-container">
            <div class="d-flex list">

                <header-item class="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-10 item" v-for="item in list" :header="item" @click.native="onHeaderClicked(item)" />

            </div>
        </div>
        <div class="scroll-button-container">
            <img class="right-scroll" src="../assets/icons/chevron-right.svg">
        </div>
    </div>

</template>

<script>
    import HeaderItem from './HeaderItem.vue';
    import * as $ from 'jquery';

    export default {
        name: 'HeadersList',
        components: {
            HeaderItem
        },
        props: ['list'],
        data() {
            return {
                listContainerId: null
            }
        },
        methods: {
            onHeaderClicked(item) {
                this.$router.push({
                    name: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                    params: {
                        id: item.album._id.$oid,
                        album_playlist: item.album,
                    }
                });
            }
        },
        mounted() {
            let self = this;

            this.listContainerId = "x" + Math.random().toString(36).substr(2, 5);

            $(document).ready(function () {
                let scrollWidth = $(`#${self.listContainerId} .item`).width();

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

                if ($(`#${self.listContainerId} .list`).prop('scrollWidth') <= $(`#${self.listContainerId} .list`).width() + 1.0) {
                    $(`#${self.listContainerId} .scroll-button-container`).css('display', 'none');
                    $(`#${self.listContainerId} .list-container`).css('width', '100vw');
                }
            });
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
</style>
