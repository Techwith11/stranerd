<template>
	<Default>
		<div class="container pt-3 pb-5">
			<helper-spinner v-if="isLoading"/>
			<div v-else>
				<div v-if="isTutor">
					<select class="form-control text-capitalize mb-3" v-model="course">
						<option v-for="course in tutor.courses" :key="course">{{ course }}</option>
					</select>
					<div class="jumbotron">
						<h3 class="text-center">Level {{ getNewLevel }} {{ course }}</h3>
						<p class="lead">This is a simple {{ course }} test designed to figure out how comfortable you are with {{ course }} before pairing you with students.</p>
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
						<button class="my-3" :class="failed ? 'opacity-25' : 'btn-success'" @click="beginTest" :disabled="failed">Start Test</button>
					</div>
				</div>
			</div>
		</div>
	</Default>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { checkForUnfinishedTests, startTest } from '@/config/tests'
	export default {
		name: 'TestsTutors',
		data: () => ({
			isLoading: true,
			course: null
		}),
		methods: {
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
					await startTest(this.course)
					this.isLoading = false
				}
			}
		},
		computed: {
			...mapGetters(['getId','getUser','isTutor']),
			tutor(){ return this.getUser.tutor || {} },
			getNewLevel(){ return this.tutor['levels'][this.course] + 1},
			getRetakeTime(){
				let d = this.tutor.upgrade[this.course][this.getNewLevel]['takenAt']
				d = new Date(d.seconds * 1000)
				d.setHours(d.getHours() + 2)
				return d.toTimeString().slice(0,5)
			},
			failed(){
                let courseUpgrade = this.tutor.upgrade[this.course]
                let upgrade = courseUpgrade[this.getNewLevel]
                if(upgrade && upgrade['passed'] === false){
                    let twoHoursToMs = 7200000
                    let failedTime = new Date(upgrade['takenAt']['seconds'] * 1000)
                    return (new Date() - failedTime) < twoHoursToMs
                }
                return false
			}
		},
		created(){
			let course = this.$route.query.course?.toLowerCase()
			this.course = this.tutor.courses.includes(course) ? course : this.tutor.courses[0]
		},
		async activated(){
			if(!this.isTutor){ await this.$router.push('/') }
			let course = this.$route.query.course?.toLowerCase()
			this.course = this.tutor.courses.includes(course) ? course : this.tutor.courses[0]
			await checkForUnfinishedTests()
			this.isLoading = false
		},
		meta(){
			return {
				title: 'Tutors Tests',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	}
</script>
