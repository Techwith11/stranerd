<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<single-video :course="course" />
			<single-nav />
			<single-overview v-if="isOverview" :course="course" />
			<single-discussions v-if="isDiscussions" :course="course" />
			<single-documents v-if="isDocuments" :course="course" />
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import SingleVideo from '@/components/courses/single/SingleVideo'
	import SingleNav from '@/components/courses/single/SingleNav'
	import SingleOverview from '@/components/courses/single/SingleOverview'
	import SingleDiscussions from '@/components/courses/single/SingleDiscussions'
	import SingleDocuments from '@/components/courses/single/SingleDocuments'
	export default {
		name: 'Course',
		data: () => ({
			course: {},
			isLoading: true
		}),
		async mounted(){
			let doc = await firestore.collection('courses').doc(this.$route.params.id).get()
			if(!doc.exists){ return this.$router.replace('/courses') }
			this.course = { '.key': doc.id, ...doc.data() }
			this.isLoading = false
			window.Fire.$on('CourseEdited', course => this.course = course)
			window.Fire.$on('CourseDeleted', () => this.$router.push('/courses'))
		},
		components: {
			'single-video': SingleVideo,
			'single-nav': SingleNav,
			'single-overview': SingleOverview,
			'single-discussions': SingleDiscussions,
			'single-documents': SingleDocuments,
			'helper-spinner': HelperSpinner
		},
		computed:{
			isOverview(){ return !this.$route.query.tab || this.$route.query.tab === 'overview'},
			isDiscussions(){ return this.$route.query.tab && this.$route.query.tab === 'discussions'},
			isDocuments(){ return this.$route.query.tab && this.$route.query.tab === 'documents'},
		}
	}
</script>