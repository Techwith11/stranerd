<template>
	<router-link class="text-decoration-none" :to="`/chats/${getOtherId}`">
		<div class="alert alert-light border-secondary text-dark" role="alert">
			<div class="font-weight-bold d-flex justify-content-between align-items-center">
				<span>{{ isByMe ? chat.to : chat.from}}</span>
				<span class="small">{{ chat.sentAt.toTimeString().slice(0,5) }}</span>
			</div>
			<div class="d-flex justify-content-between">
				<span class="d-block small text-truncate">{{ chat.content }}</span>
				<span :class="{ 'd-flex text-success': isByMe && chat.read,'d-flex text-primary' : isByMe && !chat.read, 'd-none': !isByMe }">
					<i class="fas fa-check"></i><i class="fas fa-check ml-n2"></i>
				</span>
			</div>
		</div>
	</router-link>
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
			getOtherId(){ return this.chat.from === '1' /* TODO:  Replace 1 with auth id */ ? this.chat.to : this.chat.from },
			isByMe(){ return this.chat.from === '1' /* TODO:  Replace 1 with auth id */ }
		}
	}
</script>