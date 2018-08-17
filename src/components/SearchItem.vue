<template>

    <div class="row d-flex">

        <div class="col-lg-3 col-sm-4 col-4">
            <img class="img-fluid" :src="item.image">
        </div>
        <div class="col-lg-9 col-sm-8 col-8 titles-container">
            <h5 class="title">{{ item.title }}</h5>
            <h6 class="artist">{{ item.album.artist.name }}</h6>
            <h6 class="album">{{ item.album.title }}</h6>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'SearchItem',
        props: ['item']
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .titles-container {
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .title, .artist, .album {
        padding: 0;
        margin: 0;
    }

    .title {
        color: $primary-text-color;
    }

    .artist, .album {
        color: $secondary-text-color;
    }

    img {
        border-radius: .3rem;
    }
</style>
