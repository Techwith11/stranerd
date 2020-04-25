<template>
    <div id="background">
        <div class="container">
            <h2>Courses</h2>
            <course-nav />
            <div class="row mt-2">
                <div class="col-md-6 col-lg-4" v-for="course in courses" :key="course['.key']">
                    <course-card :course="course" />
                </div>
            </div>
            <button class="primary-button">
                <router-link class="text-white text-decoration-none" to="/courses">Discover</router-link>
            </button>
        </div>
    </div>
</template>

<script>
    import { firestore } from '@/config/firebase'
    import CourseNav from '@/components/courses/list/CourseNav'
    import CourseCard from '@/components/courses/list/CourseCard'
    export default {
        components: {
            'course-nav': CourseNav,
            'course-card': CourseCard
        },
        firestore(){
            return {
                courses: firestore.collection('courses').orderBy('dates.updatedAt','desc').limit(6)
            }
        },
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
