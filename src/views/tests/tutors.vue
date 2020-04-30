<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div v-if="isTutor">
				<div v-if="started">
					<test :questions="tests" />
				</div>
				<div class="jumbotron" v-else>
					<h2 class="text-center">Level {{ tutor.level + 1 }} for Tutors</h2>
					<p class="lead">This is a simple {{ tutor.course }} test designed to figure out how comfortable you are with {{ tutor.course }} before pairing you with students.</p>
					<hr class="my-4">
					<p>Make sure you have at least an hour to spare before starting the test as once started, cannot be paused.</p>
					<p>You must pass at least 70% of the test before you can become a tutor.</p>
					<button class="shadow-none" :class="failed ? 'opacity-25' : 'accent-button'" @click="startTest" :disabled="failed">Start Test</button>
					<p class="text-danger" v-if="failed">
						You took this test less than 2 hours ago and failed to meet the 70% pass mark. You can retake the test by {{ getRetakeTime }}.
					</p>
				</div>
			</div>
			<helper-message v-else message="This account is not recognized as a tutor's account"
				optional="Visit your profile settings to upgrade" />
		</div>
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
			isLoading: false,
			started: false,
			failed: false,
			questions: [],
			tests: []
		}),
		methods: {
			checkIfFailed(){
				let upgrade = this.tutor.upgrade[this.tutor.level + 1]
				if(upgrade && upgrade['passed'] === false){
					let twoHoursToMs = 7200000
					this.failed = (new Date() - upgrade['canRetakeAt']) < twoHoursToMs
				}
			},
			async getAllQuestions(){
				let docs = await firestore.collection('questions')
					.where('subject','==', this.tutor.course)
					.where('level','==', this.tutor.level + 1)
					.orderBy('createdAt','desc')
					.limit(100)
					.get()
				docs.forEach(doc => this.questions.push({ ...doc.data(), '.key': doc.id }))
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
					while(this.tests.find(test => test['.key'] === question['.key'])){
						random = Math.floor(Math.random() * this.questions.length)
						question = this.questions[random]
					}
					this.tests.push(question)
				}
			},
			async startTest(){
				this.isLoading = true
				await this.getAllQuestions()
				this.getRandomQuestions()
				this.isLoading = false
				this.started = true
			}
		},
		computed: {
			...mapGetters(['getId','getUser']),
			tutor(){ return this.getUser.tutor || {} },
			isTutor(){ return this.getUser.roles && this.getUser.roles.isTutor },
			getRetakeTime(){
				let d = this.tutor.upgrade[this.tutor.level + 1]['canRetakeAt']
				return new Date(d.seconds * 1000).toTimeString().slice(0,5)
			}
		},
		components: {
			'test': Test,
			'helper-message': HelperMessage,
			'helper-spinner': HelperSpinner,
		},
		mounted(){
			if(this.isTutor){
				this.checkIfFailed()
			}
		}
	}
</script>