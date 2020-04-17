export default [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/about')
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import(/* webpackChunkName: "courses" */ '@/views/courses/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:id',
        name: 'Course',
        component: () => import(/* webpackChunkName: "course" */ '@/views/courses/single-course'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tutors',
        name: 'Tutors',
        component: () => import(/* webpackChunkName: "tutors" */ '@/views/tutors/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tutors/:id',
        name: 'Tutor',
        component: () => import(/* webpackChunkName: "tutor" */ '@/views/tutors/single-tutor'),
        meta: { requiresAuth: true }
    },
    {
        path: '/chats',
        name: 'Chats',
        component: () => import(/* webpackChunkName: "chats" */ '@/views/chats/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/chats/:id',
        name: 'Chat',
        component: () => import(/* webpackChunkName: "chat" */ '@/views/chats/single-chat'),
        meta: { requiresAuth: true }
    }
]