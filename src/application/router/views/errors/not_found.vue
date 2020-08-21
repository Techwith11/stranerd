<template>
	<Default>
		<div class="container">
			<h1 class="text-center mt-5 mb-3 font-italic">Oops</h1>
			<p class="text-center mb-3">The page you are looking for doesn't exist. This must be as a result of inputting something wrong in the url, or it is a fault from our engineers. We will try our very best to rectify this if the fault is from our side.</p>
			<div class="d-flex justify-content-around">
				<button class="btn btn-info" @click="goBack"><i class="fas fa-arrow-left mr-2"></i><span>Go Back</span></button>
				<button class="btn btn-success" @click="goHome"><i class="fas fa-home mr-2"></i><span>Go Home</span></button>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
	name: 'NotFound',
	setup(){
		return {
			goBack: () => router.back(),
			goHome: () => router.replace('/')
		}
	},
	meta(){
		return {
			title: 'Page Not Found',
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
