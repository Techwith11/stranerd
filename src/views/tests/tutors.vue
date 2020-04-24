<template>
	<div class="container">
		<div class="jumbotron">
			<h1 class="display-4">Level 1 for Tutors</h1>
			<p class="lead">This is a simple 30 minutes test for {{ getUser.tutor.course }}.</p>
			<hr class="my-4">
			<p>Make sure you have 30 minutes to spare before starting the test as once started, cannot be paused.</p>
			<p>You must pass at least 70% of the test before you can become a tutor.</p>
			<button class="accent-button">Start Test</button>
		</div>
		<div class="jumbotron">
			<p class="text-danger lead">
				You took this test less than 2 hours ago and failed to meet the 70% pass mark.
			</p>
			<p>Please wait before you can retake the test.</p>
		</div>
	</div>
</template>

<script>
	//import Question from '@/components/tests/tutors/Question'
	export default {
		name: 'TestsTutors',
		data: () => ({

		}),
		computed: {
			getUser(){
				return {
					tutor: {
						course: 'Mathematics',
						level: 0,
					}
				}
			},
		},
		// TODO: Remember to bring up form for tutors price after he passes the test after reg.
		// TODO: And set user claim and user role
	}
</script>