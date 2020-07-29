<template>
    <div id="background" v-if="getAllSubjects.length > 1">
        <div class="container">
            <h2 class="text-center">Courses</h2>
            <subject-card v-for="subject in getAllSubjects" :key="subject['.key']" :subject="subject"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import SubjectCard from '@/components/courses/list/SubjectCard'
    export default {
        components: {
            'subject-card': SubjectCard,
        },
        computed: mapGetters(['getAllSubjects']),
    }
</script>

<style lang="scss" scoped>
    #background{
        background: $primary-light;
        padding: 4rem 0;
        color: $text-black;
    }
    h2{
        color: $primary-dark;
    }
</style>
