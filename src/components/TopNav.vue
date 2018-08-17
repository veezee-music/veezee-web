<template>
    <nav class="d-flex justify-content-between align-items-center">
        <div>
            <button v-visible="showGoBackButton" @click="goBackClicked()" type="button" class="go-back-button"><img src="../assets/icons/left-arrow.svg"></button>
        </div>
        <router-link to="/">
            <div class="logotype-container">
                <img src="../assets/logotype-white.svg"/>
            </div>
        </router-link>
        <div>
            <button style="visibility: hidden" @click="goBackClicked()" type="button" class="go-back-button"><img src="../assets/icons/left-arrow.svg"></button>
        </div>
    </nav>
</template>

<script>
    import EventBus from '../bus.js';

    export default {
        name: 'TopNav',
        data() {
            return {
                showGoBackButton: false
            }
        },
        methods: {
            goBackClicked() {
                this.$router.back();
            }
        },
        created() {
            let self = this;

            EventBus.$on('toggle-go-back-button-in-header', (active) => {
                self.showGoBackButton = active;
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    nav {
        background-color: black;
        padding: 1rem 1rem;
    }

    .logotype-container img {
        max-height: 1.5rem;
        width: 10rem;
    }

    .go-back-button {
        background: transparent;
        border: none;
        padding: 0;
        outline: none;
        cursor: pointer;
    }
</style>
