import Home from '@/views/home.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/about.vue')
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import(/* webpackChunkName: "courses" */ '@/views/courses/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:id',
        name: 'Course',
        component: () => import(/* webpackChunkName: "course" */ '@/views/courses/single-course.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tutors',
        name: 'Tutors',
        component: () => import(/* webpackChunkName: "tutors" */ '@/views/tutors/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tutors/:id',
        name: 'Tutor',
        component: () => import(/* webpackChunkName: "tutor" */ '@/views/tutors/single-tutor.vue'),
        meta: { requiresAuth: true }
    }
]