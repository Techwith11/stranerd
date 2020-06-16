<template>
    <div id="background" v-if="courses.length > 1">
        <div class="container">
            <h2>Courses</h2>
            <div class="card-deck mt-2">
                <div class="col-lg-6 p-0" v-for="course in courses" :key="course['.key']">
                    <course-card :course="course" />
                </div>
            </div>
            <button class="primary-button mt-4">
                <router-link class="text-white text-decoration-none" to="/courses">Discover</router-link>
            </button>
        </div>
    </div>
</template>

<script>
    import { firestore } from '@/config/firebase'
    import CourseCard from '@/components/courses/list/CourseCard'
    export default {
        data: () => ({
            courses: []
        }),
        components: {
            'course-card': CourseCard
        },
        async mounted(){
            let docs = await firestore.collection('courses').orderBy('dates.updatedAt','desc').limit(6).get()
            docs.forEach(doc => this.courses.push({ '.key': doc.id, ...doc.data() }))
        },
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
        color: $primary-dark;
    }
</style>
