<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<post-info :post="post" />
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import PostInfo from '@/components/blog/single/PostInfo'
	export default {
		name: 'BlogPost',
		data: () => ({
			post: {},
			isLoading: true
		}),
		async mounted(){
			let doc = await firestore.collection('blog').doc(this.$route.params.id).get()
			if(!doc.exists){ return this.$router.replace('/blog') }
			this.post = { '.key': doc.id, ...doc.data() }
			this.isLoading = false
			window.Fire.$on('BlogPostEdited', post => this.post = post)
			window.Fire.$on('BlogPostDeleted', () => this.$router.push('/blog'))
		},
		components: {
			'helper-spinner': HelperSpinner,
			'post-info': PostInfo
		}
	}
</script>