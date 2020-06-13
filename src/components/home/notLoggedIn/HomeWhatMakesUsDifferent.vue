<template>
    <div id="background">
        <div class="container">
            <h2>What Makes Us Different</h2>
            <div class="d-flex flex-column flex-md-row justify-content-center align-items-center">
                <img :src="getImages.what_makes_us_different" alt="" class="col-md-6 mb-4">
                <div class="col-md-6 mb-4 text-left">
                    <h4>Stay focused!</h4>
                    <p></p>
                    <h4>Study easier!</h4>
                    <p></p>
                    <h4>Learn better!</h4>
                    <p></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters(['getImages'])
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        background: $primary-light;
        padding: 4rem 0;
        color: $text-black;
        text-align: center;
    }
    h2{
        margin-bottom: 3rem;
        font-size: 2.0rem;
        font-weight: bold;
    }
    .icons{
        height: 120px;
    }
    .stat{
        margin: 1rem;
        font-weight: bold;
        font-size: 2.5rem;
    }
</style>
