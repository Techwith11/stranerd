<template>
	<Default>
		<div class="container-fluid py-3">
			<helper-spinner v-if="isLoading"/>
			<div v-else>
				<post-info :post="post" />
			</div>
		</div>
	</Default>
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
			try{
				let doc = await firestore.collection('blog').doc(this.$route.params.id).get()
				if(!doc.exists){ return await this.$router.replace('/blog') }
				this.post = { '.key': doc.id, ...doc.data() }
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching post. Try refreshing the page' }) }
			this.isLoading = false
			window.Fire.$on('BlogPostEdited', post => post['.key'] === this.post['.key'] ? this.post = post : null)
			window.Fire.$on('BlogPostDeleted', post => post['.key'] === this.post['.key'] ? this.$router.push('/blog') : null)
		},
		components: {
			'helper-spinner': HelperSpinner,
			'post-info': PostInfo
		},
		meta(){
			return {
				title: this.post.title || 'Title',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: ''
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: [].join(', ')
					}
				]
			}
		}
	}
</script>
