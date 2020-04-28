<template>
	<div class="container">
		<h3 class="text-center" :class="{'text-danger': timer <= 120}">{{ getTime }}</h3>
		<div v-if="isTestRunning">
			<question v-for="(question, index) in questions" :question="question" :key="index"
				:onSelect="onAnswerSelected" :index="index"
			/>
		</div>
		<div v-if="isTestMarking">
			<div class="jumbotron text-center">
				<h3>Marking questions</h3>
				<p class="text-primary"><i class="fas fa-2x fa-spinner fa-spin"></i></p>
			</div>
		</div>
	</div>
</template>

<script>
	import Question from '@/components/tests/tutors/Question'
	export default {
		data: () => ({
			timer: 3600,
			interval: null,
			answers: [],
			isMarking: false
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
			},
			isTestRunning(){ return this.timer > 0},
			isTestMarking(){ return this.timer === 0 && this.isMarking },
		},
		components: {
			'question': Question,
		},
		methods: {
			onAnswerSelected(index, answer){ this.answers[index] = answer },
			startTest(){ this.interval = setInterval(() => this.timer > 0 ? this.timer-- : null, 1000) },
			endTest(){
				new window.Toast({ icon: 'info', title: 'Time up' })
				this.isMarking = true
				// TODO: Use on call function to mark questions, create tests records and user upgrade tutor level
			}
		},
		mounted(){
			this.startTest()
		},
		watch:{
			timer(){
				if(this.timer === 0){
					clearInterval(this.interval)
					this.endTest()
				}
			}
		},
		props: {
			questions: {
				required: true,
				type: Array[Object]
			}
		}
	}
</script>