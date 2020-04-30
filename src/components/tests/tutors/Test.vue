<template>
	<div class="container">
		<h3 class="position-sticky sticky-top text-right" :class="{'text-danger': timer <= 120}" v-if="!isMarked">{{ getTime }}</h3>
		<div>
			<question v-for="(question,index) in questions" :question="question" :key="question['.key']"
				:onSelect="onAnswerSelected" :index="index" :disabled="isMarked" />
		</div>
		<div class="d-flex justify-content-end mb-5">
			<button class="accent-button shadow-none" @click="submitTest" :disabled="isLoading || isMarked">
				<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
				<span>Submit</span>
			</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { functions } from '@/config/firebase'
	import Question from '@/components/tests/tutors/Question'
	export default {
		data: () => ({
			timer: 120,
			interval: null,
			answers: [],
			isMarked: false,
			isLoading: false,
			markTest: functions.httpsCallable('markTutorTest')
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
			...mapGetters(['getId'])
		},
		components: {
			'question': Question,
		},
		methods: {
			onAnswerSelected(index, answer) {
				if (!this.isMarked) { this.answers[index] = answer }
			},
			setInterval(){ this.interval = setInterval(() => this.timer > 0 ? this.timer-- : null, 1000) },
			endTest(){
				this.isMarked = true
				clearInterval(this.interval)
				this.isLoading = true
				new window.Toast({ icon: 'info', title: 'Submitting test' })
				this.markTest({
					questions: this.questions,
					answers: this.answers,
					level: this.level,
					course: this.course,
					id: this.getId
				}).then(res => {
					new window.Toast({ icon: 'info', title: `You scored ${res.data.score}%` })
					this.isLoading = false
					this.$router.push('/my_account')
				})
					.catch(error => {
						new window.Toast({ icon: 'error', title: error.message })
						this.isLoading = false
					})
			},
			async submitTest(){
				let result = await  new window.SweetAlert({
					title: 'Submit test',
					text: 'Are you sure you want to submit now? This cannot be undone',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Submit'
				})
				return result.value ? this.endTest() : null
			}
		},
		mounted(){
			this.answers = this.questions.map(() => null)
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
			},
			level: {
				required: true,
				type: Number
			},
			course: {
				required: true,
				type: String
			},
		},
		async beforeDestroy(){
			if(!this.isMarked){
				await this.endTest()
			}
		}
	}
</script>