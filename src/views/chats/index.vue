<template>
	<div class="container py-4">
		<chat-card v-for="chat in getSortedChats" :key="chat[0]" :chat="chat[1].chat" :user="chat[1].user" />
	</div>
</template>

<script>
	import ChatCard from '@/components/chats/list/ChatCard'
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		name: 'Chats',
		data: () => ({
			chats: {},
			chatsListeners: [],
			usersListeners: []
		}),
		components: {
			'chat-card': ChatCard
		},
		computed: {
			...mapGetters(['getId','getChattedWith']),
			getSortedChats(){
				return Object.entries(this.chats).sort((a,b) => {
					if(a[1].chat.dates && b[1].chat.dates){
						return b[1].chat.dates.sentAt.seconds - a[1].chat.dates.sentAt.seconds
					}
					return 0
				})
			}
		},
		methods:{
			getChats(){
				this.chatsListeners = this.getChattedWith.map(id => firestore.doc('chats/singles')
					.collection([id, this.getId].sort().join('_'))
					.orderBy('dates.sentAt','desc')
					.limit(1).onSnapshot(chats => {
						if(chats.empty){ return null }
						this.chats[id].chat = {
							id: chats.docs[0].id,
							...chats.docs[0].data()
						}
					})
				)
			},
			getUsers(){
				this.usersListeners = this.getChattedWith.map(id => {
					return firestore.collection('users').doc(id).onSnapshot(user => {
						this.chats[id].user = {
							id,
							bio: user.data().bio,
							status: user.data().status,
						}
					})
				})
			}
		},
		beforeDestroy() {
			this.chatsListeners.forEach(listener => listener())
			this.usersListeners.forEach(listener => listener())
		},
		watch: {
			getChattedWith(){
				this.chats = Object.fromEntries(this.getChattedWith.map(id => [id,{ chat: {}, user:{} }]))
				this.getChats()
				this.getUsers()
			}
		}
	}
</script>