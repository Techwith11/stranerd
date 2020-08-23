<template>
	<Default>
		<div class="container">
			<p>Test Students</p>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	name: 'TestsStudents',
	meta(){
		return {
			title: 'Students Tests',
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
