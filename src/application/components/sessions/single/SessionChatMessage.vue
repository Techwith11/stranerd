<template>
	<li class="d-flex" :class="{'justify-content-end': isByMe}" v-if="chat['.key']">
		<div class="chat" :class="isByMe ? 'mine' : 'not-mine'">
			<p class="m-0" v-if="!chat.media">{{ chat.content }}</p>
			<div class="d-flex justify-content-between align-items-center" v-if="chat.media">
				<span class="mr-3 d-block text-truncate">{{ chat.media.name }}</span>
				<a :href="chat.media.link" download>
					<i class="fas fa-download text-info"></i>
				</a>
			</div>
			<div class="d-flex justify-content-between small mt-2">
				<span class="mr-2" :class="{'d-none':!isByMe, 'text-primary': !isChatRead, 'text-success': isChatRead }">
					<i class="fas fa-check"></i><i class="fas fa-check ml-n2"></i>
				</span>
        <span>{{ getChatTime }}</span>
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
		getChatTime(){
			const sentAt = this.chat && this.chat.dates ? this.chat.dates.sentAt : null
			const date = sentAt ? new Date(sentAt.seconds * 1000) : new Date()
			const now = new Date()
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			const yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
			if(date > today){
				return date.toTimeString().slice(0,5)
			}else if(date > yesterday){
				return 'Yesterday'
			}else{
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
			}
		}
	},
	async mounted(){
		if(!this.isByMe && !this.isChatRead){
			if(document.visibilityState === 'visible'){
				await this.readSessionChat({ id: this.chat['.key'], path: this.$route.params.id })
			}else{
				document.onvisibilitychange = async () => {
					if(document.visibilityState === 'visible'){
						await this.readSessionChat({ id: this.chat['.key'], path: this.$route.params.id })
					}
				}
			}
		}
	},
	methods: mapActions(['readSessionChat']),
	beforeDestroy(){ document.onvisibilitychange = undefined }
}
</script>

<style lang="scss" scoped>
	.chat{
		max-width: 75%;
    padding: 1rem;
    margin: 0.25rem 0;
	}
  .mine{
    border-radius: 1.5rem 1.5rem 0 1.5rem;
    border: 1px solid $text-black;
    background: $white;
    color: $text-black;
  }
  .not-mine{
    border-radius: 1.5rem 1.5rem 1.5rem 0;
    background: #707070;
    color: $white;
  }
</style>
