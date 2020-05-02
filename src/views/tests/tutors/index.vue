<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div v-if="isTutor">
				<div class="jumbotron">
					<h2 class="text-center">Level {{ getCourse }} for Tutors</h2>
					<p class="lead">This is a simple {{ getCourse }} test designed to figure out how comfortable you are with {{ getCourse }} before pairing you with students.</p>
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
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'TestsTutors',
		data: () => ({
			isLoading: false
		}),
		methods: {
			...mapActions(['startTest']),
			async beginTest(){
				let result = await new window.SweetAlert({
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
					await this.startTest()
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
		components: {
			'helper-message': HelperMessage,
			'helper-spinner': HelperSpinner,
		}
	}
</script>