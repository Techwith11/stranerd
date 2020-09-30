export default [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '@/router/views/home.vue')
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import(/* webpackChunkName: "account" */ '@/router/views/account/index.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/shop',
		name: 'Shop',
		component: () => import(/* webpackChunkName: "shop" */ '@/router/views/shop/index.vue'),
		meta: { requiresAuth: true }
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
		path: '/posts',
		name: 'Posts',
		component: () => import(/* webpackChunkName: "posts" */ '@/router/views/posts/index.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/posts/:id',
		name: 'Post',
		component: () => import(/* webpackChunkName: "post" */ '@/router/views/posts/single-post.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/ask-a-question',
		name: 'AskQuestion',
		component: () => import(/* webpackChunkName: "ask_question" */ '@/router/views/posts/ask-a-question.vue'),
		meta: { requiresAuth: false }
	},

	{
		path: '/tests/tutors',
		name: 'TutorTests',
		component: () => import(/* webpackChunkName: "tutor_tests" */ '@/router/views/tests/tutors/index.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/tests/tutors/:id',
		name: 'TutorTest',
		component: () => import(/* webpackChunkName: "tutor_test" */ '@/router/views/tests/tutors/single-test.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/admins',
		name: 'Admins',
		component: () => import(/* webpackChunkName: "admins" */ '@/router/views/admin/index.vue'),
		meta: { requiresAuth: true, requiresAdmin: true },
		children: [
			{
				path: '/admins/upgrades',
				name: 'Upgrades',
				component: () => import(/* webpackChunkName: "upgrades" */ '@/router/views/admin/upgrades/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},

			{
				path: '/admins/questions',
				name: 'Questions',
				component: () => import(/* webpackChunkName: "questions" */ '@/router/views/admin/questions/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},
			{
				path: '/admins/questions/:subject',
				name: 'QuestionSubject',
				component: () => import(/* webpackChunkName: "question-subject" */ '@/router/views/admin/questions/single-subject.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},
			{
				path: '/admins/questions/:subject/:module',
				name: 'QuestionModule',
				component: () => import(/* webpackChunkName: "question-module" */ '@/router/views/admin/questions/single-module.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},

			{
				path: '/admins/subjects',
				name: 'Subjects',
				component: () => import(/* webpackChunkName: "subjects" */ '@/router/views/admin/subjects/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},
			{
				path: '/admins/notes',
				name: 'Notes',
				component: () => import(/* webpackChunkName: "notes" */ '@/router/views/admin/notes/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			}
		]
	},
	{
		path: '/legal/terms-of-use',
		name: 'Terms of Use',
		component: () => import(/* webpackChunkName: "terms-of-use" */ '@/router/views/legal/terms-of-use.vue'),
	},
	{
		path: '/legal/terms-and-conditions/users',
		name: 'Users Terms and Conditions',
		component: () => import(/* webpackChunkName: "terms-of-conditions-users" */ '@/router/views/legal/terms-and-conditions/users.vue'),
	},
	{
		path: '/legal/terms-and-conditions/tutors',
		name: 'Tutors Terms and Conditions',
		component: () => import(/* webpackChunkName: "terms-of-conditions-tutors" */ '@/router/views/legal/terms-and-conditions/tutors.vue'),
	},
	{
		path: '*',
		name: 'Not Found',
		component: () => import(/* webpackChunkName: "not_found" */ '@/router/views/errors/not_found.vue')
	}
]
