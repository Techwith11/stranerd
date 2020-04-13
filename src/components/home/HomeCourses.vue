<template>
    <div id="background">
        <div class="container">
            <h2>Courses</h2>
            <course-nav />
            <div class="row mt-2">
                <div class="col-md-6 col-lg-4" v-for="num in 9" :key="num">
                    <course-card :course="{'.key':1,tags: ['maths','chemistry']}" />
                </div>
            </div>
            <button class="btn primary-button" @click="$router.push('/courses')">Discover</button>
        </div>
    </div>
</template>

<script>
    import CourseNav from '@/components/courses/CourseNav'
    import CourseCard from '@/components/courses/CourseCard'
    export default {
        components: {
            'course-nav': CourseNav,
            'course-card': CourseCard
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/index.scss';
    #background{
        background: $white;
        padding: 4rem 0;
        color: $text-black;
        text-align: center;
    }
    h2{
        color: $primary-dark;
    }
</style>
