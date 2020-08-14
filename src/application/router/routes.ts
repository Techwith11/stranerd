export default [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/router/views/home.vue')
    },
    {
        path: '/pricing-plans',
        name: 'Pricing Plan',
        component: () => import(/* webpackChunkName: "pricing_plans" */ '@/router/views/pricing-plans.vue')
    },
    {
        path: '/blog',
        name: 'Blog Articles',
        component: () => import(/* webpackChunkName: "articles" */ '@/router/views/blog/index.vue')
    },
    {
        path: '/blog/:id',
        name: 'Blog Article',
        component: () => import(/* webpackChunkName: "article" */ '@/router/views/blog/single_blog.vue')
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import(/* webpackChunkName: "shop" */ '@/router/views/shop/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import(/* webpackChunkName: "courses" */ '@/router/views/courses/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:subject',
        name: 'CourseSubject',
        component: () => import(/* webpackChunkName: "course-subject" */ '@/router/views/courses/single-subject.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:subject/:module',
        name: 'CourseModule',
        component: () => import(/* webpackChunkName: "course-module" */ '@/router/views/courses/single-module.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/courses/:subject/:module/:id',
        name: 'Course',
        component: () => import(/* webpackChunkName: "course" */ '@/router/views/courses/single-course.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tutors',
        name: 'Tutors',
        component: () => import(/* webpackChunkName: "tutors" */ '@/router/views/tutors/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/users/:id',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '@/router/views/users/single-user.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions',
        name: 'SessionsAttended',
        component: () => import(/* webpackChunkName: "sessions-attended" */ '@/router/views/sessions/attended-list.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions/taught',
        name: 'SessionsTaught',
        component: () => import(/* webpackChunkName: "sessions-taught" */ '@/router/views/sessions/taught-list.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/sessions/:id',
        name: 'Session',
        component: () => import(/* webpackChunkName: "session" */ '@/router/views/sessions/single-session.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import(/* webpackChunkName: "account" */ '@/router/views/account/index.vue'),
        children: [
            {
                path: '/account',
                name: 'AccountIndex',
                component: () => import(/* webpackChunkName: "account_index" */ '@/router/views/account/account-index.vue'),
            },
            {
                path: '/account/tests',
                name: 'AccountTests',
                component: () => import(/* webpackChunkName: "account_tests" */ '@/router/views/account/account-tests.vue'),
            },
            {
                path: '/account/paymentMethods',
                name: 'AccountPaymentMethods',
                component: () => import(/* webpackChunkName: "account_payment_methods" */ '@/router/views/account/account-payment-methods.vue'),
            },
            {
                path: '/account/transactions',
                name: 'AccountTransactions',
                component: () => import(/* webpackChunkName: "account_transactions" */ '@/router/views/account/account-transactions.vue'),
            },
        ],
        meta: { requiresAuth: true }
    },
    {
        path: '/posts',
        name: 'Posts',
        component: () => import(/* webpackChunkName: "posts" */ '@/router/views/posts/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/ask-a-question',
        name: 'AskQuestion',
        component: () => import(/* webpackChunkName: "ask_question" */ '@/router/views/posts/ask-a-question.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/posts/:id',
        name: 'Post',
        component: () => import(/* webpackChunkName: "post" */ '@/router/views/posts/single-post.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tests/tutors',
        name: 'Tests Tutors',
        component: () => import(/* webpackChunkName: "tests_tutors" */ '@/router/views/tests/tutors/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tests/tutors/:id',
        name: 'Tests Tutor',
        component: () => import(/* webpackChunkName: "tests_tutor" */ '@/router/views/tests/tutors/single-test.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admins',
        name: 'Admins',
        component: () => import(/* webpackChunkName: "admins" */ '@/router/views/admin/index.vue'),
        children: [
            {
                path: '/admins/upgrades',
                name: 'Upgrades',
                component: () => import(/* webpackChunkName: "upgrades" */ '@/router/views/admin/upgrades/index.vue'),
            },
            {
                path: '/admins/questions',
                name: 'Questions',
                component: () => import(/* webpackChunkName: "questions" */ '@/router/views/admin/questions/index.vue'),
            },
            {
                path: '/admins/questions/:subject',
                name: 'QuestionSubject',
                component: () => import(/* webpackChunkName: "question-subject" */ '@/router/views/admin/questions/single-subject.vue'),
            },
            {
                path: '/admins/questions/:subject/:module',
                name: 'QuestionModule',
                component: () => import(/* webpackChunkName: "question-module" */ '@/router/views/admin/questions/single-module.vue'),
            },
            {
                path: '/admins/subjects',
                name: 'Subjects',
                component: () => import(/* webpackChunkName: "subjects" */ '@/router/views/admin/subjects/index.vue'),
            },
            {
                path: '/admins/notes',
                name: 'Notes',
                component: () => import(/* webpackChunkName: "notes" */ '@/router/views/admin/notes/index.vue'),
            }
        ],
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '*',
        name: 'Not Found',
        component: () => import(/* webpackChunkName: "not_found" */ '@/router/views/errors/not_found.vue')
    }
]
