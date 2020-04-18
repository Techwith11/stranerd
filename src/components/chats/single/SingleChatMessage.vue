<template>
	<div class="d-flex" :class="{'justify-content-end': isByMe}">
		<div class="alert alert-warning" role="alert">
			<p class="m-0" v-if="!chat.isMedia">{{ chat.content }}</p>
			<div class="d-flex justify-content-between align-items-center" v-if="chat.isMedia">
				<span class="mr-3">{{ chat.media.name }}</span>
				<a :href="chat.media.link" download>
					<i class="fas fa-download text-info"></i>
				</a>
			</div>
			<div class="d-flex justify-content-between">
				<span>{{ chat.sentAt.toTimeString().slice(0,5) }}</span>
				<span :class="{'d-none':!isByMe, 'text-primary': !chat.read, 'text-success': chat.read }">
				<i class="fas fa-check"></i><i class="fas fa-check ml-n2"></i>
			</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			chat: {
				required: true,
				type: Object
			}
		},
		computed: {
			isByMe(){ return this.chat.from === '1' /* TODO: Replace with auth id */ }
		},
	}
</script>

<style>
	.alert{
		max-width: 75%;
	}
</style>