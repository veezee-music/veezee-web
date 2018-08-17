<template>
    <div class="block">
        <header>
            <small class="type">{{ header.type.toUpperCase() }}</small>
            <h5 class="title">{{ header.title }}</h5>
            <i class="artist" v-if="header.artist">{{ header.artist.name }}</i>
        </header>
        <div>
            <img :src="header.image" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderItem',
        props: ['header']
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .block {
        text-align: left;
        padding: 0;
        cursor: pointer;
    }

    header {
        display: flex;
        flex-direction: column;
        height: 4rem;
    }

    img {
        border-radius: .3rem;
        margin-top: .3rem;
        width: 100%;
        height: 10rem;
        overflow: hidden;
        object-fit: cover;
        /*object-position: center;*/
    }

    // sm
    @media (min-width: 576px) {
        img {
            height: 17rem;
        }
    }

    // md
    @media (min-width: 768px) {
        img {
            height: 16rem;
        }
    }

    // lg
    @media (min-width: 992px) {
        img {
            height: 18rem;
        }
    }

    // xl
    @media (min-width: 1200px) {
        img {
            height: 19rem;
        }
    }

    .title {
        font-weight: 600;
        font-size: 1.3rem;
        margin-bottom: 0;
        color: $primary-text-color;
    }

    .artist {
        display: inline-block;
        font-weight: 500;
        font-size: .9rem;
        text-decoration: none;
        font-style: normal;
        color: $secondary-text-color;
    }

    .type {
        font-weight: 500;
        color: $accent;
        margin-top: auto;
        line-height: 1rem;
    }
</style>
