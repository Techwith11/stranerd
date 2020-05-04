<template>
	<router-link :to="`/sessions/${session['.key']}`" class="text-decoration-none">
		<div class="alert my-2" role="alert" :class="{'alert-success': isStillInSession, 'alert-danger': wasCancelled, 'alert-info': !wasCancelled && !isStillInSession}">
			<p class="mb-0">{{ session.duration }} {{ session.duration > 1 ? 'hours' : 'hour' }} {{ user.bio ? `with ${user.bio.name}` : '' }}</p>
			<div v-if="!wasCancelled">
				<span class="small" v-if="isStillInSession">{{ getTime }}</span>
				<span class="small" v-else>Ended {{ session.dates.endedAt.seconds * 1000 | getDateOrTime }}</span>
			</div>
			<div v-else>
				<span class="small" v-if="session.cancelled.tutor">Cancelled by {{ session.tutor === this.getId ? 'me' : 'tutor' }}</span>
				<span class="small" v-if="session.cancelled.student">Cancelled by {{ session.student === this.getId ? 'me' : 'student' }}</span>
			</div>
		</div>
		<p>{{ session.reviews }}</p>
	</router-link>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		data: () => ({
			user: {},
			timer: 0,
			interval: null,
		}),
		props: {
			session: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters(['getId']),
			getOtherPerson(){ return this.getId === this.session.tutor ? this.session.student : this.session.tutor },
			wasCancelled(){ return this.session.cancelled.student || this.session.cancelled.tutor },
			isStillInSession(){ return this.timer > 0 },
			getTime(){
				let hours = Math.floor(this.timer / 3600).toFixed(0)
				let minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
				let seconds = Math.floor(this.timer % 60).toFixed(0)
				if(hours > 0){
					return `Ends in ${hours} hours ${minutes < 10 ? '0' + minutes : minutes} minutes`
				}else if(minutes > 0){
					return `Ends in ${minutes} minutes ${seconds < 10 ? '0' + seconds : seconds} seconds`
				}else{
					return `Ends in ${seconds} seconds`
				}
			},
		},
		filters: {
			getDateOrTime(date){
				if(typeof(date) !== 'object'){
					date = new Date(date)
				}
				let now = new Date()
				let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
				if(date > today){
					return `by ${date.toTimeString().slice(0,5)}`
				}else if(date > yesterday){
					return 'yesterday'
				}else{
					return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
				}
			}
		},
		async mounted(){
			if(!this.wasCancelled){
				let endsAt = new Date(this.session.dates.endedAt.seconds * 1000)
				if(endsAt > new Date()){
					this.timer = (endsAt - new Date()) / 1000
					this.interval = window.setInterval(() => this.timer > 1 ? this.timer-- : null, 1000)
				}
			}
			let doc = await firestore.collection('users').doc(this.getOtherPerson).get()
			this.user = doc.data()
		},
		watch: {
			timer(){
				if(this.timer === 0){
					window.clearInterval(this.interval)
				}
			}
		}
	}
</script>