export default [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/router/views/home')
    },
    /*{
        path: '/about',
        name: 'About',
        component: () => import(/!* webpackChunkName: "about" *!/ '@/router/views/about')
    },*/
    {
        path: '/pricing-plans',
        name: 'Pricing Plan',
        component: () => import(/* webpackChunkName: "pricing_plans" */ '@/router/views/pricing-plans')
    },
    {
        path: '/blog',
        name: 'Blog Posts',
        component: () => import(/* webpackChunkName: "blog_posts" */ '@/router/views/blog/index')
    },
    {
        path: '/blog/:id',
        name: 'Blog Post',
        component: () => import(/* webpackChunkName: "blog_post" */ '@/router/views/blog/single_blog')
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import(/* webpackChunkName: "shop" */ '@/router/views/shop/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import(/* webpackChunkName: "courses" */ '@/router/views/courses/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:subject',
        name: 'CourseSubject',
        component: () => import(/* webpackChunkName: "course-subject" */ '@/router/views/courses/single-subject'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:subject/:module',
        name: 'CourseModule',
        component: () => import(/* webpackChunkName: "course-module" */ '@/router/views/courses/single-module'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:subject/:module/:id',
        name: 'Course',
        component: () => import(/* webpackChunkName: "course" */ '@/router/views/courses/single-course'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tutors',
        name: 'Tutors',
        component: () => import(/* webpackChunkName: "tutors" */ '@/router/views/tutors/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/users/:id',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/router/views/users/single-user'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions',
        name: 'SessionsAttended',
        component: () => import(/* webpackChunkName: "sessions-attended" */ '@/router/views/sessions/attended-list'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions/taught',
        name: 'SessionsTaught',
        component: () => import(/* webpackChunkName: "sessions-taught" */ '@/router/views/sessions/taught-list'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions/:id',
        name: 'Session',
        component: () => import(/* webpackChunkName: "session" */ '@/router/views/sessions/single-session'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import(/* webpackChunkName: "account" */ '@/router/views/account/index'),
        children: [
            {
                path: '/account',
                name: 'AccountIndex',
                component: () => import(/* webpackChunkName: "account_index" */ '@/router/views/account/account-index'),
            },
            {
                path: '/account/tests',
                name: 'AccountTests',
                component: () => import(/* webpackChunkName: "account_tests" */ '@/router/views/account/account-tests'),
            },
            {
                path: '/account/paymentMethods',
                name: 'AccountPaymentMethods',
                component: () => import(/* webpackChunkName: "account_payment_methods" */ '@/router/views/account/account-payment-methods'),
            },
            {
                path: '/account/transactions',
                name: 'AccountTransactions',
                component: () => import(/* webpackChunkName: "account_transactions" */ '@/router/views/account/account-transactions'),
            },
        ],
        meta: { requiresAuth: true }
    },
    {
        path: '/posts',
        name: 'Posts',
        component: () => import(/* webpackChunkName: "posts" */ '@/router/views/posts/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/ask-a-question',
        name: 'AskQuestion',
        component: () => import(/* webpackChunkName: "ask_question" */ '@/router/views/posts/ask-a-question'),
        meta: { requiresAuth: false }
    },
    {
        path: '/posts/:id',
        name: 'Post',
        component: () => import(/* webpackChunkName: "post" */ '@/router/views/posts/single-post'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tests/tutors',
        name: 'Tests Tutors',
        component: () => import(/* webpackChunkName: "tests_tutors" */ '@/router/views/tests/tutors/index'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tests/tutors/:id',
        name: 'Tests Tutor',
        component: () => import(/* webpackChunkName: "tests_tutor" */ '@/router/views/tests/tutors/single-test'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admins',
        name: 'Admins',
        component: () => import(/* webpackChunkName: "admins" */ '@/router/views/admin/index'),
        children: [
            {
                path: '/admins/upgrades',
                name: 'Upgrades',
                component: () => import(/* webpackChunkName: "upgrades" */ '@/router/views/admin/upgrades/index'),
            },
            {
                path: '/admins/questions',
                name: 'Questions',
                component: () => import(/* webpackChunkName: "questions" */ '@/router/views/admin/questions/index'),
            },
            {
                path: '/admins/questions/:subject',
                name: 'QuestionSubject',
                component: () => import(/* webpackChunkName: "question-subject" */ '@/router/views/admin/questions/single-subject'),
            },
            {
                path: '/admins/questions/:subject/:module',
                name: 'QuestionModule',
                component: () => import(/* webpackChunkName: "question-module" */ '@/router/views/admin/questions/single-module'),
            },
            {
                path: '/admins/subjects',
                name: 'Subjects',
                component: () => import(/* webpackChunkName: "subjects" */ '@/router/views/admin/subjects/index'),
            },
            {
                path: '/admins/notes',
                name: 'Notes',
                component: () => import(/* webpackChunkName: "notes" */ '@/router/views/admin/notes/index'),
            }
        ],
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '*',
        name: 'Not Found',
        component: () => import(/* webpackChunkName: "not_found" */ '@/router/views/errors/not_found')
    }
]
