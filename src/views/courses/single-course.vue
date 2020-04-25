<template>
	<div>
		<div v-if="courseExists">
			<single-video :course="course" />
			<single-nav />
			<single-overview v-if="isOverview" :course="course" />
			<single-discussions v-if="isDiscussions" :course="course" />
			<single-documents v-if="isDocuments" :course="course" />
		</div>
		<div v-else class="container d-flex justify-content-center py-5 my-5">
			<span class="lead">No course with such id exists</span>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import SingleVideo from '@/components/courses/single/SingleVideo'
	import SingleNav from '@/components/courses/single/SingleNav'
	import SingleOverview from '@/components/courses/single/SingleOverview'
	import SingleDiscussions from '@/components/courses/single/SingleDiscussions'
	import SingleDocuments from '@/components/courses/single/SingleDocuments'
	export default {
		name: 'Course',
		firestore(){
			return { course: firestore.collection('courses').doc(this.$route.params.id) }
		},
		components: {
			'single-video': SingleVideo,
			'single-nav': SingleNav,
			'single-overview': SingleOverview,
			'single-discussions': SingleDiscussions,
			'single-documents': SingleDocuments,
		},
		computed:{
			isOverview(){ return !this.$route.query.tab || this.$route.query.tab === 'overview'},
			isDiscussions(){ return this.$route.query.tab && this.$route.query.tab === 'discussions'},
			isDocuments(){ return this.$route.query.tab && this.$route.query.tab === 'documents'},
			courseExists(){ return Object.entries(this.course).length > 0 }
		}
	}
</script>