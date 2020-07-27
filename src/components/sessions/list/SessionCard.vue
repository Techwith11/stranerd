<template>
	<router-link :to="`/sessions/${session['.key']}`" class="text-decoration-none">
		<div class="alert d-flex align-items-center my-2 shadow-sm" role="alert" :class="{'alert-success': isStillInSession, 'alert-danger': wasCancelled, 'alert-info': !wasCancelled && !isStillInSession}">
			<img :src="getImageLink" class="profile-image" alt="">
			<div>
				<p class="mb-0">{{ getLength }} {{ user.bio ? `with ${user.bio.name}` : '' }}</p>
				<div v-if="!wasCancelled">
					<span class="small" v-if="isStillInSession">{{ getTime }}</span>
					<div class="small d-flex justify-content-between align-items-center" v-else>
						<span>Ended {{ session.dates.endedAt.seconds * 1000 | getDateOrTime }}</span>
						<rating-stars :rating="getRating" />
					</div>
				</div>
				<div v-else>
					<span class="small" v-if="session.cancelled.tutor">Cancelled by {{ session.tutor === this.getId ? 'me' : 'tutor' }}</span>
					<span class="small" v-if="session.cancelled.student">Cancelled by {{ session.student === this.getId ? 'me' : 'student' }}</span>
				</div>
			</div>
		</div>
	</router-link>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import RatingStars from '@/components/helpers/RatingStars'
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
		components: {
			'rating-stars': RatingStars
		},
		computed: {
			...mapGetters(['getId','getDefaultImage']),
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
			getRating(){
				if(!this.session.reviews){ return 0 }
				if(this.getId === this.session.tutor){
					return this.session.reviews.tutor && this.session.reviews.tutor.rating ? this.session.reviews.tutor.rating : 0
				}else{
					return this.session.reviews.student && this.session.reviews.student.rating ? this.session.reviews.student.rating : 0
				}
			},
			getOtherPerson(){ return this.getId === this.session.tutor ? this.session.student : this.session.tutor },
			getLength(){
				if(this.session.duration >= 1){
					return this.session.duration === 1 ? `${this.session.duration} hour` : `${this.session.duration} hours`
				}
				else{
					let minutes = Math.floor(this.session.duration * 60)
					return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`
				}
			},
			wasCancelled(){ return this.session.cancelled.student || this.session.cancelled.tutor },
			isStillInSession(){ return this.timer > 0 },
			getTime(){
				let hours = Math.floor(this.timer / 3600).toFixed(0)
				let minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
				let seconds = Math.floor(this.timer % 60).toFixed(0)
				if(hours > 0){
					return `return \`Ends in ${hours} hours ${minutes < 10 ? '0' + minutes : minutes} ${minutes > 1 ? 'minutes' : 'minute'}\``
				}else if(minutes > 0){
					return `Ends in ${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ${seconds < 10 ? '0' + seconds : seconds} ${seconds > 1 ? 'seconds' : 'second'}`
				}else{
					return `Ends in ${seconds} ${seconds > 1 ? 'seconds' : 'second'}`
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
					return `${date.toTimeString().slice(0,5)}`
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
					this.timer = Math.floor((endsAt - new Date()) / 1000)
					this.interval = window.setInterval(() => this.timer > 1 ? this.timer-- : null, 1000)
				}
			}
			let doc = await firestore.collection('users').doc(this.getOtherPerson).get()
			this.user = doc.data()
		},
		watch: {
			timer(){
				if(Math.floor(this.timer) === 0){
					window.clearInterval(this.interval)
				}
			}
		}
	}
</script>
