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
        path: '/blog',
        name: 'Blog Posts',
        component: () => import(/* webpackChunkName: "blog_posts" */ '@/views/blog/index')
    },
    {
        path: '/blog/:id',
        name: 'Blog Post',
        component: () => import(/* webpackChunkName: "blog_post" */ '@/views/blog/single_blog')
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/index'),
        meta: { requiresAuth: true }
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
        path: '/users/:id',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/views/users/single-user'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions',
        name: 'Sessions',
        component: () => import(/* webpackChunkName: "sessions" */ '@/views/sessions/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions/:id',
        name: 'Session',
        component: () => import(/* webpackChunkName: "session" */ '@/views/sessions/single-session'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/posts',
        name: 'Posts',
        component: () => import(/* webpackChunkName: "posts" */ '@/views/posts/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/posts/create',
        name: 'CreatePost',
        component: () => import(/* webpackChunkName: "create_post" */ '@/views/posts/create-post'),
        meta: { requiresAuth: true }
    },
    {
        path: '/posts/:id',
        name: 'Post',
        component: () => import(/* webpackChunkName: "post" */ '@/views/posts/single-post'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tests/tutors',
        name: 'Tests Tutors',
        component: () => import(/* webpackChunkName: "tests_tutors" */ '@/views/tests/tutors/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tests/tutors/:id',
        name: 'Tests Tutor',
        component: () => import(/* webpackChunkName: "tests_tutor" */ '@/views/tests/tutors/single-test'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admins',
        name: 'Admins',
        component: () => import(/* webpackChunkName: "admins" */ '@/views/admin/index'),
        children: [
            {
                path: '/admins/upgrades',
                name: 'Upgrades',
                component: () => import(/* webpackChunkName: "upgrades" */ '@/views/admin/upgrades/index'),
            },
            {
                path: '/admins/questions',
                name: 'Questions',
                component: () => import(/* webpackChunkName: "questions" */ '@/views/admin/questions/index'),
            }
        ],
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '*',
        name: 'Not Found',
        component: () => import(/* webpackChunkName: "not_found" */ '@/views/errors/not_found')
    }
]