<template>
	<Default>
		<helper-spinner v-if="isLoading" />
		<div v-else id="messageContainer">
			<single-chat-nav :user="user" />
			<div class="container py-3 mb-3" :id="canHaveSession ? 'smaller-height' : 'longer-height'">
				<helper-message v-if="chats.length < 1" message="No chats. Send a message now" />
				<ul class="list-group" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}" v-if="chats.length > 0">
					<li class="d-block text-center small text-muted mb-2" v-if="hasMore">
						<i class="fas text-info fa-spinner fa-spin mr-1" v-if="isOlderChatsLoading"></i>
						<span @click="fetchOlderMessages">Fetch Older</span>
					</li>
					<single-chat-message :chat="chat" v-for="chat in chats" :key="chat['.key']" />
				</ul>
				<ul v-else></ul>
				<single-chat-form />
			</div>
		</div>
	</Default>
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
			user: {},
			chats: [],
			fetched: false,
			isLoading: true,
			isOlderChatsLoading: false,
			chatsListener: () => {},
			paginationLimit: 10,
			hasMore: false
		}),
		computed: {
			...mapGetters(['getId']),
            canHaveSession(){ return this.user.roles && this.user.roles.isTutor && this.user['.key'] !== this.getId },
			getChatPath(){ return [this.$route.params.id, this.getId].sort().join('_') }
		},
		methods: {
			async getUser(){
				let doc = await firestore.collection('users').doc(this.$route.params.id).get()
				if(!doc.exists){ return this.$router.replace('/chats') }
				this.user = { '.key': doc.id, ...doc.data() }
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
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach(doc => {
					let index = this.chats.findIndex(r => r['.key'] === doc.id)
					if(index === -1){
						this.chats.unshift({ '.key': doc.id, ...doc.data() })
					}else{
						this.chats[index] = { '.key': doc.id, ...doc.data() }
					}
				})
			},
			setListener(){
				let lastItem = this.chats[this.chats.length - 1]
				let query = firestore.collection(`chats/${this.getChatPath}/chats`).orderBy('dates.sentAt')
				if(lastItem){
					query = query.where('dates.sentAt','>',lastItem.dates.sentAt)
				}
				this.chatsListener = query.onSnapshot(snapshot => {
					snapshot.docs.forEach(doc => {
						let index = this.chats.findIndex(r => r['.key'] === doc.id)
						if(index === -1){
							this.chats.push({ '.key': doc.id, ...doc.data() })
						}else{
							this.chats[index] = { '.key': doc.id, ...doc.data() }
						}
					})
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
		async mounted(){
			this.isLoading = true
			await this.getUser()
			await this.getChats()
			await this.setListener()
			this.fetched = true
			this.isLoading = false
		},
		async activated(){
			this.isLoading = true
			if(!this.fetched){
				await this.getUser()
				await this.getChats()
				this.fetched = true
			}
			await this.setListener()
			this.isLoading = false
		},
		deactivated(){
			this.chatsListener()
		},
		meta(){
			return {
				title: this.user.bio ? this.user.bio.name : 'Chat',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
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
		height: calc(100vh - 230px + 32px);
		ul{
			height: calc(100vh - 268px);
		}
		@media screen and (min-width: 768px) {
			&{
				height: calc(100vh - 180px + 32px);
				ul{
					height: calc(100vh - 218px);
				}
			}
		}
	}
	#longer-height{
		height: calc(100vh - 180px + 32px);
		ul{
			height: calc(100vh - 218px);
		}
	}
</style>
