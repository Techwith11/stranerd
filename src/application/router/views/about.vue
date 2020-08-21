<template>
	<Default>
		<div class="container">
			<p>About page coming soon</p>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	meta(){
		return {
			title: 'About Stranerd',
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
})
</script>
