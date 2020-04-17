<template>
	<div class="container">
		<tutor-info :tutor="tutor" />
		<h6 class="text-center font-weight-bold">Recent Sessions</h6>
		<div class="row">
			<div class="col-md-6 col-lg-4" v-for="session in tutor.sessions" :key="session['.key']">
				<tutor-session-card  :session="session" />
			</div>
		</div>
	</div>
</template>

<script>
	import TutorInfo from '@/components/tutors/single/TutorInfo'
	import TutorSessionCard from '@/components/tutors/single/TutorSessionCard'
	export default {
		name: 'Tutor',
		data: () => ({
			tutor: {
				'.key': 'fghjkl',
				name: "Prof. Timmy Salami",
				bio: 'Timmy Salami is a senior educational evangelist based in Lagos, Nigeria. He has 3 PhDs in fields ranging from Applied Mathematics to Electrical and Electronic engineering.',
				email: 'timmysalami@gmail.com',
				active: true,
				tested: true,
				price: 25,
				course: 'Mathematics',
				qualification: 'Diploma certificate',
				ratings: [4.5,4.0,5.0,4.5,5.0],
				sessions: [
					{
						'.key': 'hjkl',
						student_comment: 'Prof Timmy is an excellent tutor. Best 2 hours of my life',
						duration: 2,
						student_rating: 4.5,
						created_at: new Date(2019,8,20)
					},{
						'.key': 'kajs',
						student_comment: 'Prof Timmy is an excellent tutor. Best 2 hours of my life',
						duration: 1.5,
						student_rating: 5.0,
						created_at: new Date(2019,8,24)
					},{
						'.key': 'eiue',
						student_comment: 'Prof Timmy is an excellent tutor. Best 2 hours of my life',
						duration: 2,
						student_rating: 4.0,
						created_at: new Date(2019,9,1)
					},
				]

			}
		}),
		components: {
			'tutor-session-card': TutorSessionCard,
			'tutor-info': TutorInfo,
		}
	}
</script>