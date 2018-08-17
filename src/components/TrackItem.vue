<template>
    <div class="block">
        <img :src="track.image" />
        <div class="titles-container">
            <h6 class="title">{{ track.title }}</h6>
            <i>{{ track.album.artist.name }}</i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AlbumPlaylistItem',
        props: ['track']
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .block {
        text-align: left;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        align-self: center;
        cursor: pointer;
    }

    .titles-container {
        margin: 0 .5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .title {
        font-size: 1.1rem;
        margin-top: .1rem;
        margin-bottom: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: $primary-text-color;
    }

    i {
        font-size: 1rem;
        text-decoration: none;
        font-style: normal;
        color: $secondary-text-color;
    }

    img {
        border-radius: .3rem;
        height: 100%;
    }
</style>
