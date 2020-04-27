<template>
	<div>
		<single-chat-nav :user="user" />
		<div class="container py-3">
			<ul class="list-group position-relative" v-chat-scroll="{ notSmoothOnInit:false, always:true, smooth:true }" @v-chat-scroll-top-reached="doSomething">
				<single-chat-message :chat="chat" v-for="chat in chats" :key="chat['.key']" />
			</ul>
			<single-chat-form />
		</div>
	</div>
</template>

<script>
	import SingleChatNav from '@/components/chats/single/SingleChatNav'
	import SingleChatMessage from '@/components/chats/single/SingleChatMessage'
	import SingleChatForm from '@/components/chats/single/SingleChatForm'
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		name: 'Chat',
		computed: {
			...mapGetters(['getId']),
			getChatPath(){ return [this.$route.params.id, this.getId].sort().join('_') }
		},
		firestore(){
			return {
				chats: firestore.doc('chats/singles').collection(this.getChatPath).orderBy('dates.sentAt'),
				user: firestore.collection('users').doc(this.$route.params.id)
			}
		},
		methods: {
			doSomething(){ console.log('Top')}
		},
		components: {
			'single-chat-nav': SingleChatNav,
			'single-chat-message': SingleChatMessage,
			'single-chat-form': SingleChatForm,
		}
	}
</script>

<style lang="scss" scoped>
	ul{
		max-height: 70vh;
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
</style>