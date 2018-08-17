<template>
    <div class="block">
        <img :src="genre.image" />
        <h6 class="title">{{ genre.title }}</h6>
    </div>
</template>

<script>
    export default {
        name: 'GenreItem',
        props: ['genre']
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .block {
        cursor: pointer;
    }

    .title {
        text-align: center;
        margin-bottom: 0;
        margin-top: .5rem;
        font-size: .9rem;
        color: $primary-text-color;
    }

    img {
        border-radius: .3rem;
        width: 100%;
    }
</style>
