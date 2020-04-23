<template>
	<div class="container">
		<p>Test Tutors</p>
		<button @click="num = getRandomNumber()">Get Random</button>
		<p>{{ num }}</p>
	</div>
</template>

<script>
	export default {
		name: 'TestsTutors',
		data: () => ({
			tests: [1,2,3,4,5,6,7,8,9,10],
			questions: [],
			num: null
		}),
		// TODO: Take to test page
		// TODO: Remember to bring up form for tutors price after he passes the test after reg.
		// And set user claim and user role
		methods: {
			getRandomNumber(){
				let random = Math.floor(Math.random() * this.tests.length)
				while(this.questions.includes(random)){
					if(this.questions.length === this.tests.length){
						new window.Toast({ icon: 'warning', title: 'No more questions' })
						return null
					}
					random = Math.floor(Math.random() * this.tests.length)
				}
				this.questions.push(random)
				return random
			}
		}
	}
</script>