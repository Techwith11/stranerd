<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div v-if="isTutor">
				<div class="jumbotron">
					<h2 class="text-center">Level {{ tutor['levels'][tutor.courses[0]] + 1 }} for Tutors</h2>
					<p class="lead">This is a simple {{ tutor.courses[0] }} test designed to figure out how comfortable you are with {{ tutor.courses[0] }} before pairing you with students.</p>
					<hr class="my-4">
					<p>Make sure you have at least an hour to spare before starting the test.</p>
					<p>You must pass at least 70% of the test before you can become a tutor.</p>
					<button class="shadow-none" :class="failed ? 'opacity-25' : 'accent-button'" @click="beginTest" :disabled="failed">Start Test</button>
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
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'TestsTutors',
		data: () => ({
			isLoading: false,
			failed: false,
		}),
		methods: {
			...mapActions(['startTest']),
			checkIfFailed(){
				let courseUpgrade = this.tutor.upgrade[this.tutor.courses[0]]
				let upgrade = courseUpgrade[this.tutor['levels'][this.tutor.courses[0]] + 1]
				if(upgrade && upgrade['passed'] === false){
					let twoHoursToMs = 7200000
					let failedTime = new Date(upgrade['takenAt']['seconds'] * 1000)
					this.failed = (new Date() - failedTime) < twoHoursToMs
				}
			},
			async beginTest(){
				let result = await  new window.SweetAlert({
					title: 'Start test',
					text: 'Are you sure you are ready to start? This test cannot be paused when started',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Start'
				})
				if(result.value){
					this.isLoading = true

					this.isLoading = false
				}
			}
		},
		computed: {
			...mapGetters(['getId','getUser']),
			tutor(){ return this.getUser.tutor || {} },
			isTutor(){ return this.getUser.roles && this.getUser.roles.isTutor },
			getRetakeTime(){
				let d = this.tutor.upgrade[this.tutor.course][this.tutor.level + 1]['takenAt']
				d = new Date(d.seconds * 1000)
				d.setHours(d.getHours() + 2)
				return d.toTimeString().slice(0,5)
			}
		},
		components: {
			'helper-message': HelperMessage,
			'helper-spinner': HelperSpinner,
		},
		mounted(){
			let data = localStorage.getItem('test-data')
			if(data){
				data = JSON.parse(data)
				this.tests = data.questions
				this.started = true
				this.shouldSubmit = data
				localStorage.removeItem('test-data')
			}
			if(this.isTutor){
				this.checkIfFailed()
			}
		}
	}
</script>