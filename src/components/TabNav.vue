<template>
    <nav class="d-flex justify-content-center">
        <div class="tabs-container d-flex align-items-center">
            <router-link to="/"><div class="tab-link"><h5>Browse</h5></div></router-link>
            <router-link to="/search"><div class="tab-link"><h5>Search</h5></div></router-link>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'TabNav',
        props: {
            msg: String
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/styles/custom-styles.scss';

    $tabs-container-width: 50%;

    nav {
        background-color: $primary;
    }

    .tabs-container {
        //width: $tabs-container-width;
    }

    .tab-link {
        min-width: 6rem;
        padding: .5rem 0;
        color: $gray-light;
        user-select: none;

        h5 {
            margin-bottom: 0;
        }

        img {
            height: 1rem;
        }

        &:hover {
            color: $gray;
            transition: .3s;
        }
    }

    .link-container a {
        color: white;
    }

    .link-container a:hover {
        text-decoration: none;
    }
</style>
