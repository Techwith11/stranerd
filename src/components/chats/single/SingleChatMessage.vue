<template>
	<li class="d-flex" :class="{'justify-content-end': isByMe}" v-if="chat['.key']">
		<div class="alert alert-warning" role="alert">
			<p class="m-0" v-if="!chat.media">{{ chat.content }}</p>
			<div class="d-flex justify-content-between align-items-center" v-if="chat.media">
				<span class="mr-3">{{ chat.media.name }}</span>
				<a :href="chat.media.link" download>
					<i class="fas fa-download text-info"></i>
				</a>
			</div>
			<div class="d-flex justify-content-between">
				<span class="mr-5">{{ getChatTime }}</span>
				<span :class="{'d-none':!isByMe, 'text-primary': !isChatRead, 'text-success': isChatRead }">
					<i class="fas fa-check"></i><i class="fas fa-check ml-n2"></i>
				</span>
			</div>
		</div>
	</li>
</template>

<script>
	import firebase, { firestore } from '@/config/firebase'
	export default {
		props: {
			chat: {
				required: true,
				type: Object
			}
		},
		computed: {
			isByMe(){ return this.chat.from === 'kevin11' /* TODO: Replace with auth id */ },
			isChatRead(){ return this.chat.dates.readAt !== null },
			getChatTime(){ return new Date(this.chat.dates.sentAt.seconds * 1000).toTimeString().slice(0,5) }
		},
		async mounted(){
			if(!this.isByMe && this.isChatRead){
				await firestore.doc('chats/singles').collection(this.chat.between.sort().join('_')).doc(this.chat['.key']).set({
					dates: {
						readAt: firebase.firestore.FieldValue.serverTimestamp()
					}
				}, { merge: true})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.alert{
		max-width: 75%;
	}
</style>