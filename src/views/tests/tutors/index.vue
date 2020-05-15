<template>
	<div class="container mt-3 mb-5">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div v-if="isTutor">
				<div class="jumbotron">
					<h3 class="text-center">Level {{ getNewLevel }} {{ getCourse }}</h3>
					<p class="lead">This is a simple {{ getCourse }} test designed to figure out how comfortable you are with {{ getCourse }} before pairing you with students.</p>
					<div class="text-danger" v-if="failed">
						<hr class="my-4">
						<span>You took this test less than 2 hours ago and failed to meet the 70% pass mark. You can retake the test by {{ getRetakeTime }}.</span>
					</div>
				</div>
				<h5>Important Notice</h5>
				<ul class="list-group small">
					<li class="list-group-item">The test cannot be paused once started.</li>
					<li class="list-group-item">You must pass at least 70% to become a tutor</li>
					<li class="list-group-item">Make sure you have at least an hour to spare before starting the test.</li>
					<li class="list-group-item">Do not attempt to open the test on two tabs at the same time, as they might attempt to upload different results when the time is up.</li>
					<li class="list-group-item">If for whatsoever reason you have to open a new tab, ensure to close the old one. We will attempt to reconnect you back to the test</li>
				</ul>
				<div class="d-flex justify-content-end">
					<button class="my-3" :class="failed ? 'opacity-25' : 'accent-button'" @click="beginTest" :disabled="failed">Start Test</button>
				</div>
			</div>
			<helper-message v-else message="This account is not recognized as a tutor's account" />
		</div>
	</div>
</template>

<script>
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'TestsTutors',
		data: () => ({
			isLoading: true
		}),
		methods: {
			...mapActions(['startTest','checkForUnfinishedTests']),
			async beginTest(){
				let result = await new window.SweetAlert({
					title: 'Start test',
					text: 'Are you sure you are ready to start?',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Start'
				})
				if(result.value){
					this.isLoading = true
					await this.startTest()
					this.isLoading = false
				}
			}
		},
		computed: {
			...mapGetters(['getUser','isTutor']),
			tutor(){ return this.getUser.tutor || {} },
			getCourse(){ return this.tutor.courses[0] },
			getNewLevel(){ return this.tutor['levels'][this.getCourse] + 1},
			getRetakeTime(){
				let d = this.tutor.upgrade[this.getCourse][this.getNewLevel]['takenAt']
				d = new Date(d.seconds * 1000)
				d.setHours(d.getHours() + 2)
				return d.toTimeString().slice(0,5)
			},
			failed(){
                let courseUpgrade = this.tutor.upgrade[this.getCourse]
                let upgrade = courseUpgrade[this.getNewLevel]
                if(upgrade && upgrade['passed'] === false){
                    let twoHoursToMs = 7200000
                    let failedTime = new Date(upgrade['takenAt']['seconds'] * 1000)
                    return (new Date() - failedTime) < twoHoursToMs
                }
                return false
			}
		},
		async mounted(){
			await this.checkForUnfinishedTests()
			this.isLoading = false
		},
		components: {
			'helper-message': HelperMessage,
			'helper-spinner': HelperSpinner,
		}
	}
</script>