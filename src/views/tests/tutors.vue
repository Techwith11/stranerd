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
		<test :questions="tests" />
	</div>
</template>

<script>
	import Test from '@/components/tests/tutors/Test'
	export default {
		name: 'TestsTutors',
		data: () => ({
			started: false,
			failed: false,
			questions: [
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' },
				{ title: 'If x is 2 and y is 6, what is 2x -y?', a: '-2', b: '2', c: '0', d: 'None of the above', correct: 'a' }
			],
			tests: [],
		}),
		methods: {
			getRandomQuestions(){
				for(let i = 0; i < 10; i++){
					if(this.questions.length === this.tests.length){
						new window.Toast({ icon: 'warning', title: 'No more questions' })
						break
					}
					let random = Math.floor(Math.random() * this.questions.length)
					while(this.tests.find(test => test.random === random)){
						random = Math.floor(Math.random() * this.questions.length)
					}
					this.tests.push(this.questions[random])
				}
			},
		},
		computed: {
			getUser:() => ({ tutor: { course: 'Mathematics', level: 0 } })
		},
		components: {
			'test': Test
		},
		firestore(){
			return {
				// fetch auth user's test records and check that last failed was not less than 2 hours ago
				// Use auth user level and course to fetch questions related to course and a level up
			}
		},
		mounted(){
			this.getRandomQuestions()
		}
	}
</script>