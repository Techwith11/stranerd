<template>
	<div class="container">
		<div class="alert border border-primary" v-for="tutor in filteredTutors" :key="tutor['.key']">
			<p>{{ tutor.bio.name }}</p>
			<p>{{ tutor.tutor.courses }}</p>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	export default {
		name: 'Tutors',
		data: () => ({
			tutors: [],
			listener: null
		}),
		computed: {
			filteredTutors(){
				return this.tutors
			}
		},
		async mounted(){
			// TODO: Try adding transitions for all pages with listeners
			this.listener = await firestore.collection('users').where('roles.isTutor','==',true).onSnapshot(snapshot => {
				snapshot.docs.forEach(doc => {
					let tutor = this.tutors.find(tutor => tutor['.key'] === doc.id)
					if(tutor){
						tutor = { '.key': doc.id, ...doc.data() }
					}else{
						this.tutors.push({ '.key': doc.id, ...doc.data() })
					}
				})
			})
		},
		beforeDestroy(){ return this.listener ? this.listener() : null }
	}
</script>