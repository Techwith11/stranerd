<template>
	<div class="center my-5">
		<p>{{ message }}</p>
		<p class="mt-3 small">{{ optional ? optional : '' }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
	props: {
		message: {
			type: String,
			required: true
		},
		optional: {
			type: String,
			required: false
		}
	}
})
</script>

<style lang="scss" scoped>
	.center{
		/*position: absolute;
		left: 50%;
		top: 50%;*/
		text-align: center;
		//transform: translate(-50%,-50%);
	}
</style>
