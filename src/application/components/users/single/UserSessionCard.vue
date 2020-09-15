<template>
	<div class="d-flex align-items-start my-2 border rounded p-3">
		<img :src="getImageLink" class="mr-3" width="50px" alt="">
		<div class="">
			<span class="card-title font-weight-bold">{{ getLength }} {{ student.bio ? `with ${student.bio.name}` : '' }}</span>
			<div class="text-muted small">
				<p class="mb-1">Ended {{ session.dates.createdAt.seconds * 1000 | getDateOrTime }}</p>
				<rating-stars :rating="getRating" />
				<span>Student Remarks: {{ getComment }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { firestore } from '@/config/firebase'
import { mapGetters } from 'vuex'
import RatingStars from '@/components/helpers/RatingStars'
export default {
	data: () => ({
		student: {}
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
	filters: {
		getDateOrTime(date){
			if(typeof(date) !== 'object'){
				date = new Date(date)
			}
			const now = new Date()
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			const yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
			if(date > today){
				return `${date.toTimeString().slice(0,5)}`
			}else if(date > yesterday){
				return 'yesterday'
			}else{
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
			}
		},
	},
	computed: {
		...mapGetters(['getDefaultImage']),
		getImageLink(){ return this.student.bio && this.student.bio.image && this.student.bio.image.link ? this.student.bio.image.link : this.getDefaultImage },
		getLength(){
			if(this.session.duration >= 1){
				return this.session.duration === 1 ? `${this.session.duration} hour` : `${this.session.duration} hours`
			}
			else{
				const minutes = Math.floor(this.session.duration * 60)
				return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`
			}
		},
		getRating(){
			return parseFloat(Number(this.session?.reviews?.student?.rating ?? 0).toFixed(1))
		},
		getComment(){
			return this.session?.reviews?.student?.comment ?? 'None'
		},
	},
	async mounted(){
		const doc = await firestore.collection('users').doc(this.session.student).get()
		this.student = doc.data()
	}
}
</script>
