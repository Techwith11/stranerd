import Home from '@/views/Home.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import(/* webpackChunkName: "videos" */ '@/views/courses/index.vue')
    }
]