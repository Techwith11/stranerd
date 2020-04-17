<template>
	<router-link class="text-decoration-none text-black" :to="`/chats/${getOtherId}`">
		<div class="alert border-secondary" role="alert" :class="{ 'alert-success': isByMe && chat.read,'alert-info' : isByMe && !chat.read, 'alert-danger': !isByMe }">
			<div class="font-weight-bold d-flex justify-content-between align-items-center">
				<span>{{ isByMe ? chat.to : chat.from}}</span>
				<span class="small">{{ chat.sentAt.toTimeString().slice(0,9) }}</span>
			</div>
			<span class="d-block small text-truncate">{{ chat.content }}</span>
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