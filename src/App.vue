<template>

    <div id="app">
        <div class="header">
            <top-nav></top-nav>
            <tab-nav></tab-nav>
        </div>

        <div class="container-fluid" style="margin-top: 1rem">
            <router-view/>
        </div>

        <!--background-image: url('https://veezee.cloud/content/images/5ac90b5e659a81523125086.jpg');-->
        <bottom-player class="bottom-player"/>


    </div>

</template>

<style lang="scss">
    @import './assets/styles/custom-styles.scss';
    @import '../node_modules/bootstrap/scss/bootstrap.scss';

    .header {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .bottom-player {
        border: .1rem solid $primary-text-color;
        border-left: none;
        position: sticky;
        position: -webkit-sticky;
        bottom: 2rem;
        border-bottom-right-radius: .4rem;
        border-top-right-radius: .4rem;
        @media screen and (max-width: 567px) {
            border-radius: 0;
        }
    }

    @media (max-width: 576px) {
        .bottom-player {
            border: 1px solid $primary-text-color;
            border-left: none;
            border-right: none;
            border-bottom: none;
            position: sticky;
            position: -webkit-sticky;
            bottom: 0;
            border-radius: 0;
        }
    }

    html {
        min-height: 100vh;
        background-color: $primary;
    }

    body {
        background-color: $primary;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    nav.tabs {
        height: 3rem;
        background-color: darkblue;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .container-fluid {
        padding: 0;
        min-height: 100vh;
    }
</style>
<script>
    import TopNav from './components/TopNav.vue';
    import TabNav from './components/TabNav.vue';
    import BottomPlayer from './components/BottomPlayer.vue';
    import AudioPlayer from './AudioPlayer.js';

    export default {
        components: {
            BottomPlayer,
            TopNav,
            TabNav
        },
        data() {
            return {
            }
        },
        created() {
            if(window.veezee === undefined) {
                window.veezee = {};
                window.veezee.audioPlayer = new AudioPlayer();
            }
        }
    }
</script>