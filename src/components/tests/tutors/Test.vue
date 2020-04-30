<template>
	<div class="container">
		<h3 class="position-sticky sticky-top text-right" :class="{'text-danger': timer <= 120}" v-if="!isMarked">{{ getTime }}</h3>
		<div>
			<question v-for="(question,index) in questions" :question="question" :key="question['.key']"
				:onSelect="onAnswerSelected" :index="index" :disabled="isMarked" />
		</div>
		<div class="d-flex justify-content-end mb-5">
			<button class="accent-button shadow-none" @click="submitTest">Submit</button>
		</div>
	</div>
</template>

<script>
	import Question from '@/components/tests/tutors/Question'
	export default {
		data: () => ({
			timer: 120,
			interval: null,
			answers: [],
			isMarked: false
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
		},
		components: {
			'question': Question,
		},
		methods: {
			onAnswerSelected(index, answer) {
				if (!this.isMarked) { this.answers[index] = answer }
			},
			setInterval(){ this.interval = setInterval(() => this.timer > 0 ? this.timer-- : null, 1000) },
			async endTest(){
				clearInterval(this.interval)
				this.isLoading = true
				new window.Toast({ icon: 'info', title: 'Submitting test' })
				this.isMarked = true
				this.isLoading = false
				// TODO: Use on call function to upload questions and answers, mark, create tests records and upgrade tutor level
			},
			submitTest(){
				this.endTest()
			}
		},
		mounted(){
			this.timer = this.questions.length * 120
			this.setInterval()
		},
		watch:{
			timer(){
				if(this.timer === 0){ this.endTest() }
			}
		},
		props: {
			questions: {
				required: true,
				type: Array[Object]
			}
		},
		async beforeDestroy(){
			if(!this.isMarked){
				await this.endTest()
			}
		}
	}
</script>