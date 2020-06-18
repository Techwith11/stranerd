<template>
	<div>
		<helper-spinner />
	</div>
</template>

<script>
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		name: 'CreatePost',
		components: {
			'helper-spinner': HelperSpinner
		},
		async created(){ await this.$router.push('/?createPost=true') },
		meta(){
			return {
				title: 'Create Post',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	}
</script>