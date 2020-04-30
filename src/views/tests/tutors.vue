<template>
	<div class="container">
		<div v-if="isTutor">
			<helper-spinner v-if="isLoading"/>
			<div v-else>
				<div class="jumbotron" v-if="failed">
					<p class="text-danger lead">
						You took this test less than 2 hours ago and failed to meet the 70% pass mark.
					</p>
					<p>You can retake the test on {{ getRetakeTime[0] }} by {{ getRetakeTime[1] }}.</p>
				</div>
				<div v-else>
					<div v-if="started">
						<test :questions="tests" />
					</div>
					<div class="jumbotron" v-else>
						<h2>Level {{ tutor.level + 1 }} for Tutors</h2>
						<p class="lead">This is a simple 30 minutes test for {{ tutor.course }}.</p>
						<hr class="my-4">
						<p>Make sure you have 30 minutes to spare before starting the test as once started, cannot be paused.</p>
						<p>You must pass at least 70% of the test before you can become a tutor.</p>
						<button class="accent-button" @click="startTest">Start Test</button>
					</div>
				</div>
			</div>
		</div>
		<helper-message  v-else
			message="This account is not recognized as a tutor's account"
			optional="Visit your profile settings to upgrade" />
	</div>
</template>

<script>
	import Test from '@/components/tests/tutors/Test'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		name: 'TestsTutors',
		data: () => ({
			started: false,
			failed: false,
			isLoading: false,
			tutor: {},
			questions: [],
			tests: [],
			isTutor: false
		}),
		methods: {
			async getUserDetails(){
				this.isLoading = true
				let ref = firestore.collection('users').doc(this.getId)
				this.isTutor = (await ref.get()).data().roles.isTutor
				if(this.isTutor){
					this.tutor = (await ref.get()).data().tutor
					let upgrade = this.tutor.upgrade[this.tutor.level + 1]
					if(!upgrade.passed){
						let twoHoursToMs = 7200000
						if((new Date() - upgrade.canRetakeAt) < twoHoursToMs){
							this.failed = true
						}
						this.isLoading = false
						return null
					}
					return null
				}
				this.isLoading = false
				return null
			},
			async getAllQuestions(){
				this.questions = []
				let docs = await firestore.collection('questions')
					.where('subject','==', this.tutor.course)
					.where('level','==', this.tutor.level + 1)
					.orderBy('createdAt','desc')
					.limit(100)
					.get()
				docs.forEach(doc => this.questions.push({ ...doc.data(), id: doc.id }))
			},
			getRandomQuestions(){
				// TODO: Adjust test length to number required for testing
				let testLength = 5
				this.tests = []
				for(let i = 0; i < testLength; i++){
					if(this.questions.length === this.tests.length){
						new window.Toast({ icon: 'warning', title: 'No more questions' })
						break
					}
					let random = Math.floor(Math.random() * this.questions.length)
					let question = this.questions[random]
					while(this.tests.find(test => test.id === question.id)){
						random = Math.floor(Math.random() * this.questions.length)
						question = this.questions[random]
					}
					this.tests.push(question)
				}
			},
			startTest(){
				this.started = true
			}
		},
		computed: {
			...mapGetters(['getId']),
			getRetakeTime(){
				let d = this.tutor.upgrade[this.tutor.level + 1].canRetakeAt
				let date = new Date(d.seconds * 1000)
				let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
				let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
				let time = `${hours}:${minutes}`
				return [date.toDateString(),time]
			}
		},
		components: {
			'test': Test,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
		},
		async mounted(){
			await this.getUserDetails()
			if(this.isTutor){
				await this.getAllQuestions()
				this.getRandomQuestions()
			}
		}
	}
</script>