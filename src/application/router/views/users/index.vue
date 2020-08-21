<template>
	<Default>
		<div class="container">
			<p>Users List</p>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	name: 'Users',
	meta(){
		return {
			title: 'Users',
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
