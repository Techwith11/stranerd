export default [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '@application/router/views/home.vue')
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import(/* webpackChunkName: "account" */ '@application/router/views/account/index.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/shop',
		name: 'Shop',
		component: () => import(/* webpackChunkName: "shop" */ '@application/router/views/shop/index.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/blog',
		name: 'Blog Articles',
		component: () => import(/* webpackChunkName: "articles" */ '@application/router/views/blog/index.vue')
	},
	{
		path: '/blog/:id',
		name: 'Blog Article',
		component: () => import(/* webpackChunkName: "article" */ '@application/router/views/blog/single_blog.vue')
	},

	{
		path: '/courses',
		name: 'Courses',
		component: () => import(/* webpackChunkName: "courses" */ '@application/router/views/courses/index.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/courses/:subject',
		name: 'CourseSubject',
		component: () => import(/* webpackChunkName: "course-subject" */ '@application/router/views/courses/single-subject.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/courses/:subject/:module',
		name: 'CourseModule',
		component: () => import(/* webpackChunkName: "course-module" */ '@application/router/views/courses/single-module.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/courses/:subject/:module/:id',
		name: 'Course',
		component: () => import(/* webpackChunkName: "course" */ '@application/router/views/courses/single-course.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/tutors',
		name: 'Tutors',
		component: () => import(/* webpackChunkName: "tutors" */ '@application/router/views/tutors/index.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/users/:id',
		name: 'User',
		component: () => import(/* webpackChunkName: "user" */ '@application/router/views/users/single-user.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/sessions',
		name: 'SessionsAttended',
		component: () => import(/* webpackChunkName: "sessions-attended" */ '@application/router/views/sessions/attended-list.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/sessions/taught',
		name: 'SessionsTaught',
		component: () => import(/* webpackChunkName: "sessions-taught" */ '@application/router/views/sessions/taught-list.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/sessions/:id',
		name: 'Session',
		component: () => import(/* webpackChunkName: "session" */ '@application/router/views/sessions/single-session.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/posts',
		name: 'Posts',
		component: () => import(/* webpackChunkName: "posts" */ '@application/router/views/posts/index.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/posts/:id',
		name: 'Post',
		component: () => import(/* webpackChunkName: "post" */ '@application/router/views/posts/single-post.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/ask-a-question',
		name: 'AskQuestion',
		component: () => import(/* webpackChunkName: "ask_question" */ '@application/router/views/posts/ask-a-question.vue'),
		meta: { requiresAuth: false }
	},

	{
		path: '/tests/tutors',
		name: 'TutorTests',
		component: () => import(/* webpackChunkName: "tutor_tests" */ '@application/router/views/tests/tutors/index.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/tests/tutors/:id',
		name: 'TutorTest',
		component: () => import(/* webpackChunkName: "tutor_test" */ '@application/router/views/tests/tutors/single-test.vue'),
		meta: { requiresAuth: true }
	},

	{
		path: '/admins',
		name: 'Admins',
		component: () => import(/* webpackChunkName: "admins" */ '@application/router/views/admin/index.vue'),
		meta: { requiresAuth: true, requiresAdmin: true },
		children: [
			{
				path: '/admins/upgrades',
				name: 'Upgrades',
				component: () => import(/* webpackChunkName: "upgrades" */ '@application/router/views/admin/upgrades/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},

			{
				path: '/admins/questions',
				name: 'Questions',
				component: () => import(/* webpackChunkName: "questions" */ '@application/router/views/admin/questions/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},
			{
				path: '/admins/questions/:subject',
				name: 'QuestionSubject',
				component: () => import(/* webpackChunkName: "question-subject" */ '@application/router/views/admin/questions/single-subject.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},
			{
				path: '/admins/questions/:subject/:module',
				name: 'QuestionModule',
				component: () => import(/* webpackChunkName: "question-module" */ '@application/router/views/admin/questions/single-module.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},

			{
				path: '/admins/subjects',
				name: 'Subjects',
				component: () => import(/* webpackChunkName: "subjects" */ '@application/router/views/admin/subjects/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			},
			{
				path: '/admins/notes',
				name: 'Notes',
				component: () => import(/* webpackChunkName: "notes" */ '@application/router/views/admin/notes/index.vue'),
				meta: { requiresAuth: true, requiresAdmin: true }
			}
		]
	},
	{
		path: '/legal/terms-of-use',
		name: 'Terms of Use',
		component: () => import(/* webpackChunkName: "terms-of-use" */ '@application/router/views/legal/terms-of-use.vue'),
	},
	{
		path: '/legal/privacy-policy',
		name: 'Privacy Policy',
		component: () => import(/* webpackChunkName: "privacy-policy" */ '@application/router/views/legal/privacy-policy.vue'),
	},
	{
		path: '/legal/terms-and-conditions/users',
		name: 'Users Terms and Conditions',
		component: () => import(/* webpackChunkName: "terms-of-conditions-users" */ '@application/router/views/legal/terms-and-conditions/users.vue'),
	},
	{
		path: '/legal/terms-and-conditions/tutors',
		name: 'Tutors Terms and Conditions',
		component: () => import(/* webpackChunkName: "terms-of-conditions-tutors" */ '@application/router/views/legal/terms-and-conditions/tutors.vue'),
	},
	{
		path: '*',
		name: 'Not Found',
		redirect: '/'
	}
]
