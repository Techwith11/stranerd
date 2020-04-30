<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div v-if="doesExist">
				<single-video :course="course" />
				<single-nav />
				<single-overview v-if="isOverview" :course="course" />
				<single-discussions v-if="isDiscussions" :course="course" />
				<single-documents v-if="isDocuments" :course="course" />
			</div>
			<helper-message v-else message="No course with such id exists" />
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import SingleVideo from '@/components/courses/single/SingleVideo'
	import SingleNav from '@/components/courses/single/SingleNav'
	import SingleOverview from '@/components/courses/single/SingleOverview'
	import SingleDiscussions from '@/components/courses/single/SingleDiscussions'
	import SingleDocuments from '@/components/courses/single/SingleDocuments'
	export default {
		name: 'Course',
		data: () => ({
			course: {},
			isLoading: true,
			doesExist: false
		}),
		async mounted(){
			let doc = await firestore.collection('courses').doc(this.$route.params.id).get()
			this.doesExist = doc.exists
			this.course = { '.key': doc.id, ...doc.data() }
			this.isLoading = false
		},
		components: {
			'single-video': SingleVideo,
			'single-nav': SingleNav,
			'single-overview': SingleOverview,
			'single-discussions': SingleDiscussions,
			'single-documents': SingleDocuments,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
		},
		computed:{
			isOverview(){ return !this.$route.query.tab || this.$route.query.tab === 'overview'},
			isDiscussions(){ return this.$route.query.tab && this.$route.query.tab === 'discussions'},
			isDocuments(){ return this.$route.query.tab && this.$route.query.tab === 'documents'},
		}
	}
</script>