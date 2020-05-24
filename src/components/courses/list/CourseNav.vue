<template>
	<div class="accent-background">
		<div class="container">
			<ul class="nav scrolling-nav">
				<li class="nav-item">
					<router-link class="nav-link" to="/courses">All</router-link>
				</li>
				<li class="nav-item" v-for="subject in subjects" :key="subject['.key']">
					<router-link class="nav-link" :to="`/courses?tab=${subject.name}`">{{ subject.name }}</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { firestore } from "@/config/firebase";

	export default {
		data: () => ({
			subjects: []
		}),
		async mounted(){
			let docs = await firestore.collection('subjects').get()
			docs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
		}
	}
</script>