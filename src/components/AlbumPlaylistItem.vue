<template>
    <div class="block">
        <img :src="album_playlist.image" />
        <h6 class="title">{{ album_playlist.title }}</h6>
        <i v-if="album_playlist.artist">{{ album_playlist.artist.name }}</i>
    </div>
</template>

<script>
    export default {
        name: 'AlbumPlaylistItem',
        props: ['album_playlist']
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    .block {
        text-align: left;
        padding: 0;
        cursor: pointer;
    }

    .title {
        font-size: 1rem;
        margin-top: .5rem;
        margin-bottom: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: $primary-text-color;
    }

    img {
        border-radius: .3rem;
        max-width: 100%;
        max-height: 100%;
    }

    i {
        font-size: .9rem;
        text-decoration: none;
        font-style: normal;
        color: $secondary-text-color;
    }
</style>
