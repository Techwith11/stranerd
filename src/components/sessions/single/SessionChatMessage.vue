<template>
	<li class="d-flex" :class="{'justify-content-end': isByMe}" v-if="chat['.key']">
		<div class="alert alert-warning" role="alert">
			<p class="m-0" v-if="!chat.media">{{ chat.content }}</p>
			<div class="d-flex justify-content-between align-items-center" v-if="chat.media">
				<span class="mr-3 d-block text-truncate">{{ chat.media.name }}</span>
				<a :href="chat.media.link" download>
					<i class="fas fa-download text-info"></i>
				</a>
			</div>
			<div class="d-flex justify-content-between small">
				<span class="mr-5 text-black-50">{{ getChatTime | getDateOrTime }}</span>
				<span :class="{'d-none':!isByMe, 'text-primary': !isChatRead, 'text-success': isChatRead }">
					<i class="fas fa-check"></i><i class="fas fa-check ml-n2"></i>
				</span>
			</div>
		</div>
	</li>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		props: {
			chat: {
				required: true,
				type: Object
			}
		},
		computed: {
			...mapGetters(['getId']),
			isByMe(){ return this.chat.from === this.getId },
			isChatRead(){ return this.chat.dates.readAt !== null },
			getChatTime(){ return new Date(this.chat.dates.sentAt.seconds * 1000) }
		},
		async mounted(){
			if(!this.isByMe && !this.isChatRead){
				await this.readSessionChat({ id: this.chat['.key'], path: this.$route.params.id })
			}
		},
		methods: mapActions(['readSessionChat']),
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

<style lang="scss" scoped>
	.alert{
		max-width: 75%;
	}
</style>