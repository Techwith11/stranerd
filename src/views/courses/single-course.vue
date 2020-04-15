<template>
	<div>
		<div class="container">
			<video src="@/assets/videos/test.mp4" controls></video>
			<h5 class="text-center">{{ course.title }}</h5>
		</div>
		<single-nav />
		<single-overview class="container" v-if="isOverview" :course="course" />
		<single-discussions class="container" v-if="isDiscussions" :course="course" />
		<single-documents class="container" v-if="isDocuments" :course="course" />
	</div>
</template>

<script>
	import SingleNav from '@/components/courses/single/SingleNav'
	import SingleOverview from '@/components/courses/single/SingleOverview'
	import SingleDiscussions from '@/components/courses/single/SingleDiscussions'
	import SingleDocuments from '@/components/courses/single/SingleDocuments'
	export default {
		name: 'Course',
		data: () => ({
			course: {
				id: 1,
				title: 'The Theory of Quantum Mechanics',
				description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
				sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
				At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
				Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
				Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
				At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
				no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet.
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.`,
				tags: ['Mathematics', 'Physics', 'Chemistry'],
				video: 'video url',
				image: 'image url',
				preview: 'preview url',
				premium: true,
				user: 1,
				created_at: new Date().toUTCString(),
				author: {
					id:1,
					name: 'Timmy Salami',
					description: 'Timmy Salami is a senior educational evangelist based in Lagos, Nigeria. He has 3 PhDs in fields ranging from Applied Mathematics to Electrical and Electronic engineering.'
				},
				documents: [
					{ name: 'Quantum Mechanics 101 by Timmy Salami.pdf', link: '#' },
					{ name: 'Example questions.pdf', link: '#' },
					{ name: 'Past Questions.pdf', link: '#' },
				],
				discussions: [
					{ id:1, body: 'At what point does mechanics get classfied as quantum?', user: 1 },
					{ id:2, body: 'Prof Salami, nice work on this content', user: 2 },
					{ id:3, body: 'Contact me on whatsapp +2349016478642 for your iTunes cards', user: 3 },
					{ id:4, body: 'Can someone kick this guy out of here please?', user: 4 },
					{ id:5, body: 'Can we all just focus on the content?', user: 5 }
				]
			}
		}),
		components: {
			'single-nav': SingleNav,
			'single-overview': SingleOverview,
			'single-discussions': SingleDiscussions,
			'single-documents': SingleDocuments,
		},
		computed:{
			isOverview(){ return !this.$route.query.tab || this.$route.query.tab === 'overview'},
			isDiscussions(){ return this.$route.query.tab && this.$route.query.tab === 'discussions'},
			isDocuments(){ return this.$route.query.tab && this.$route.query.tab === 'documents'},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/index.scss';
	video{
		width: 100%;
	}
</style>