<template>
	<router-link class="text-decoration-none" :to="`/chats/${getUserId}`">
		<div class="alert alert-light border-secondary text-dark" role="alert" v-if="chat && chat.id">
			<div class="font-weight-bold d-flex justify-content-between align-items-center">
				<span>{{ getUserName }}</span>
				<span class="small">{{ getChatTime | getDateOrTime }}</span>
			</div>
			<div class="d-flex justify-content-between">
				<span class="d-block small text-truncate" :class="{'font-weight-bold': !isByMe && !getChatRead}">{{ getChatContent }}</span>
				<span :class="{ 'd-flex text-success': isByMe && getChatRead,'d-flex text-primary' : isByMe && !getChatRead, 'd-none': !isByMe }">
					<i class="fas fa-check"></i><i class="fas fa-check ml-n2"></i>
				</span>
			</div>
		</div>
	</router-link>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props: {
			chat: {
				required: true,
			},
			user: {
				required: true,
			}
		},
		computed: {
			...mapGetters(['getId']),
			isByMe(){ return this.chat.from === this.getId  },
			getUserId(){ return this.user.id },
			getUserName(){ return this.user.bio ? this.user.bio.name : '' },
			getChatContent(){ return this.chat.media ? this.chat.media.name : this.chat.content },
			getChatTime(){ return this.chat.dates ? new Date(this.chat.dates.sentAt.seconds * 1000) : '' },
			getChatRead(){ return this.chat.dates.readAt != null },
		},
		filters: {
			getDateOrTime(date){
				if(typeof(date) === 'string') { return date }
				let now = new Date()
				let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
				let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
				if(date > today){
					return date.toTimeString().slice(0,5)
				}else if(date > yesterday){
					return 'Yesterday'
				}else{
					return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
				}
			}
		}
	}
</script>