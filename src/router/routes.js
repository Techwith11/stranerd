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
        component: () => import(/* webpackChunkName: "courses" */ '@/views/courses/index.vue')
    },
    {
        path: '/courses/:id',
        name: 'Course',
        component: () => import(/* webpackChunkName: "course" */ '@/views/courses/single-course.vue')
    }
    ,{
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/login.vue')
    },{
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/register.vue')
    },
]