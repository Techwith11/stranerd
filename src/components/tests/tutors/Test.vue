<template>
	<div class="container">
		<h3 class="text-center">{{ getTime }}</h3>
		<question v-for="(question, index) in questions" :question="question" :key="index"
			:onSelect="onAnswerSelected" :index="index"
		/>
	</div>
</template>

<script>
	import Question from '@/components/tests/tutors/Question'
	export default {
		data: () => ({
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
			answers: [],
			timer: 30,
			interval: null
		}),
		computed: {
			getTime(){
				let hours = Math.floor(this.timer / 3600).toFixed(0)
				let minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
				let seconds = Math.floor(this.timer % 60).toFixed(0)
				hours > 9 ? `${hours}` : hours = `0${hours}`
				minutes > 9 ? `${minutes}` : minutes = `0${minutes}`
				seconds > 9 ? `${seconds}` : seconds = `0${seconds}`
				return `${hours} : ${minutes} : ${seconds}`
			}
		},
		components: {
			'question': Question,
		},
		methods: {
			getRandomQuestion(){
				if(this.questions.length === this.tests.length){
					return new window.Toast({ icon: 'warning', title: 'No more questions' })
				}
				let random = Math.floor(Math.random() * this.questions.length)
				while(this.tests.find(test => test.random === random)){
					random = Math.floor(Math.random() * this.questions.length)
				}
				return this.tests.push(this.questions[random])
			},
			onAnswerSelected(index, answer){ this.answers[index] = answer },
			startInterval(){
				this.interval = setInterval(() => {
					if(this.timer > 0){
						this.timer--
					}
				}, 1000)
			}
		},
		mounted(){
			this.startInterval()
		},
		watch:{
			timer(){
				if(this.timer === 0){
					clearInterval(this.interval)
					alert('Time up')
				}
			}
		}
	}
</script>