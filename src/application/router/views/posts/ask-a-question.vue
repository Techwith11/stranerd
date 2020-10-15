<template>
	<Default>
    <banner>
      <h1>Post a Question</h1>
    </banner>
    <div class="shadow-sm rounded-xl p-3 mx-auto my-4" style="max-width: 600px">
      <create-post />
    </div>
	</Default>
</template>


<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CreatePost from '@application/components/posts/PostForm.vue'
export default defineComponent({
	name: 'AskAQuestion',
	components: {
		'create-post': CreatePost
	},
	meta(){
		return {
			title: 'Ask A Question',
			meta: [
				{
					vmid: 'robots',
					name: 'robots',
					content: 'none'
				}
			]
		}
	}
})
</script>
