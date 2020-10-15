<template>
	<div class="spinner-border text-info" role="status" :style="`width:${size}rem;height:${size}rem;`">
		<span class="sr-only">Loading...</span>
	</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	props: {
		size: {
			type: Number,
			default: () => 1
		}
	}
})
</script>
