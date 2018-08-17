<template>
    <div>

        <div class="row">
            <div class="col-lg-3 col-1"></div>
            <div class="col-lg-6 col-10">
                <img @click="fetchSearchResults()" class="search-button" src="../assets/icons/search.svg">
                <input v-on:keyup.enter="fetchSearchResults()" v-model="query" type="text" class="form-control search-input" placeholder="veezee">
            </div>
            <div class="col-lg-3 col-1"></div>
        </div>

        <div v-if="result[0] != undefined && result[0] != null" class="row" style="margin: 2rem 0">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">

                <h2 class="section-title">Tracks</h2>
                <search-item v-for="item in result[0].trackList" :item="item" style="padding: 1rem;" />

            </div>
            <div class="col-lg-3"></div>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import { mapState, mapMutations, mapActions } from 'vuex';
    import SearchItem from '../components/SearchItem.vue';
    import axios from 'axios';
    import Utilities from '../Utilities.js';
    import EventBus from '../bus.js';

    export default {
        name: 'Search',
        components: {
            SearchItem
        },
        data() {
            return {
                loading: false,
                result: [],
                query: ""
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
            fetchSearchResults() {
                let self = this;

                axios.get(`/get/search?q=${this.query}`).then((response) => {
                    self.result = response.data;
                }).catch((error) => {
                    // error
                }).then(() => {
                    // always executed
                    self.loading = false;
                });
            }
        },
        created() {
            let self = this;
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .search-button {
        position: absolute;
        z-index: 1;
        margin-top: .5rem;
        left: 2rem;
        cursor: pointer;
    }

    .search-input {
        background-color: $primary;
        text-indent: 2.5rem;
        color: $primary-text-color;

        &::placeholder {
            text-indent: 2.5rem;
        }
    }

    .search-input:focus {
        background-color: $gray-dark;
    }

    .section-title {
        text-align: left;
        color: $primary-text-color;
    }
</style>
