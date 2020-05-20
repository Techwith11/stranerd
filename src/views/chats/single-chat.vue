<template>
	<div>
		<helper-spinner v-if="isLoading" />
		<div v-else id="messageContainer">
			<single-chat-nav :user="user" />
			<div class="container py-3" :id="canHaveSession ? 'smaller-height' : 'longer-height'">
				<helper-message v-if="chats.length < 1 && newChats.length < 1" message="No chats. Send a message now" />
				<ul class="list-group" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}">
					<li class="d-block text-center small text-muted mb-2" v-if="!hasNoMore">
						<i class="fas text-info fa-spinner fa-spin mr-1" v-if="isOlderChatsLoading"></i>
						<span @click="fetchOlderMessages">Fetch Older</span>
					</li>
					<single-chat-message :chat="chat" v-for="chat in chats" :key="chat['.key']" />
					<single-chat-message :chat="chat" v-for="chat in newChats" :key="chat['.key']" />
				</ul>
				<single-chat-form />
			</div>
		</div>
	</div>
</template>

<script>
	import SingleChatNav from '@/components/chats/single/SingleChatNav'
	import SingleChatMessage from '@/components/chats/single/SingleChatMessage'
	import SingleChatForm from '@/components/chats/single/SingleChatForm'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import { firestore } from '@/config/firebase'
	import { mapGetters } from 'vuex'
	export default {
		name: 'Chat',
		data: () => ({
			doesExist: false,
			user: {},
			chats: [],
			newChats: [],
			isLoading: true,
			isOlderChatsLoading: false,
			chatsListeners: () => {},
			paginationLimit: 10,
			hasNoMore: false
		}),
		computed: {
			...mapGetters(['getId']),
            canHaveSession(){ return this.user.roles.isTutor && this.user['.key'] !== this.getId },
			getChatPath(){ return [this.$route.params.id, this.getId].sort().join('_') }
		},
		methods: {
			async getUser(){
				let doc = await firestore.collection('users').doc(this.$route.params.id).get()
				if(!doc.exists){ return this.$router.replace('/chats') }
				this.user = { '.key': doc.id, ...doc.data() }
				this.doesExist = doc.exists
				this.isLoading = false
			},
			async getChats(){
				let docs = firestore.collection(`chats/${this.getChatPath}/chats`).orderBy('dates.sentAt','desc')
					.limit(this.paginationLimit)
				if(this.chats.length > 0){
					let lastItem = this.chats[0]
					docs = docs.where('dates.sentAt','<',lastItem.dates.sentAt)
				}
				docs = await docs.get()
				if(docs.size < this.paginationLimit){ this.hasNoMore = true }
				docs.forEach(doc => this.chats.unshift({ '.key': doc.id, ...doc.data() }))
			},
			setListener(){
				let lastItem = this.chats[this.chats.length - 1]
				let query = firestore.collection(`chats/${this.getChatPath}/chats`).orderBy('dates.sentAt')
				if(lastItem){
					query = query.where('dates.sentAt','>',lastItem.dates.sentAt)
				}
				this.chatsListeners = query.onSnapshot(snapshot => {
					this.newChats = []
					snapshot.docs.forEach(doc => this.newChats.push({ '.key': doc.id, ...doc.data() }))
				})
			},
			async fetchOlderMessages(){
				this.isOlderChatsLoading = true
				await this.getChats()
				this.isOlderChatsLoading = false
			}
		},
		components: {
			'single-chat-nav': SingleChatNav,
			'single-chat-message': SingleChatMessage,
			'single-chat-form': SingleChatForm,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
		},
		async mounted() {
			await this.getUser()
			await this.getChats()
			this.isLoading = false
			this.setListener()
		},
		beforeDestroy(){
			this.chatsListeners()
		}
	}
</script>

<style lang="scss" scoped>
	ul{
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
	#smaller-height{
		height: calc(100vh - 218px + 32px);
		ul{
			height: calc(100vh - 256px);
		}
	}
	#longer-height{
		height: calc(100vh - 168px + 32px);
		ul{
			height: calc(100vh - 206px);
		}
	}
</style>