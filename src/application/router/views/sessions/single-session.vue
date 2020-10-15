<template>
	<Default>
		<div class="h-100">
			<helper-spinner v-if="isLoading"/>
			<div v-else class="d-flex flex-column flex-lg-row h-100">
				<div class="flex-grow-1">
					<session-nav class="h-100" :user="otherPerson" :timer="timer" />
				</div>
				<div class="flex-grow-2 h-100 position-relative" id="background">
					<div class="px-3" :id="timer > 0 ? 'smaller-height' : 'longer-height'">
						<helper-message v-if="chats.length < 1" :message="timer > 0 ? 'No messages. Send a message now' : 'Session has ended and no message was sent.'" />
						<ul class="list-group" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}" v-if="chats.length > 0">
							<li class="d-block text-center small text-muted mb-2" v-if="hasMore">
								<i class="fas text-info fa-spinner fa-spin" v-if="isOlderChatsLoading"></i>
								<span @click="fetchOlderMessages">Fetch Older</span>
							</li>
							<session-chat-message :chat="chat" v-for="chat in chats" :key="chat['.key']" />
						</ul>
						<ul v-else></ul>
						<session-chat-form v-if="timer > 0" />
					</div>
				</div>
			</div>
		</div>
	</Default>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { firestore } from '@application/config/firebase'
import SessionChatForm from '@application/components/sessions/single/SessionChatForm'
import SessionChatMessage from '@application/components/sessions/single/SessionChatMessage'
import SessionNav from '@application/components/sessions/single/SessionNav'
export default {
	name: 'SingleSession',
	data: () => ({
		isLoading: true,
		isOlderChatsLoading: false,
		timer: 600,
		interval: null,
		session: {},
		otherPerson: {},
		chats: [],
		fetched: false,
		paginationLimit: 10,
		hasMore: true,
		otherPersonListener: () => {},
		chatsListener: () => {}
	}),
	components: {
		'session-nav': SessionNav,
		'session-chat-form': SessionChatForm,
		'session-chat-message': SessionChatMessage,
	},
	methods:{
		...mapActions(['showSessionRatingsForm']),
		async getSessionInfo(){
			try{
				const doc = await firestore.collection('sessions').doc(this.$route.params.id).get()
				if(!doc.exists){ return await this.$router.replace('/sessions') }
				const session = { '.key': doc.id, ...doc.data() }
				if(this.getId !== session.tutor && this.getId !== session.student){ return await this.$router.replace('/sessions') }
				if(session.cancelled.tutor || session.cancelled.student){ return await this.$router.replace('/sessions') }
				this.session = session
			}catch(error){ return await this.$router.replace('/sessions') }
		},
		initTimer(){
			const endsAt = new Date(this.session.dates.endedAt.seconds * 1000)
			if(endsAt < new Date()){
				this.timer = 0
			}else{
				this.timer = Math.floor((endsAt - new Date()) / 1000)
				this.interval = setInterval(() => this.timer > 0 ? this.timer-- : null, 1000)
			}
			window.addEventListener('beforeunload',() => { this.cleanUp() })
		},
		async getChats(){
			try{
				let docs = firestore.collection(`sessions/${this.session['.key']}/chats`).orderBy('dates.sentAt','desc')
					.limit(this.paginationLimit)
				if(this.chats.length > 0){
					const lastItem = this.chats[0]
					docs = docs.where('dates.sentAt','<',lastItem.dates.sentAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach((doc) => this.chats.unshift({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching chats. Try refreshing the page' }) }
		},
		setChatListener(){
			const lastItem = this.chats[this.chats.length - 1]
			let query = firestore.collection(`sessions/${this.session['.key']}/chats`).orderBy('dates.sentAt')
			if(lastItem){
				query = query.where('dates.sentAt','>',lastItem.dates.sentAt)
			}
			this.chatsListener = query.onSnapshot((snapshot) => {
				snapshot.docs.forEach((doc) => {
					const index = this.chats.findIndex((r) => r['.key'] === doc.id)
					if(index === -1){
						this.chats.push({ '.key': doc.id, ...doc.data() })
					}else{
						this.chats[index] = { '.key': doc.id, ...doc.data() }
					}
				})
			})
		},
		setOtherPersonListener(){
			const otherPerson = this.session.tutor === this.getId ? this.session.student : this.session.tutor
			this.otherPersonListener = firestore.collection('users').doc(otherPerson)
				.onSnapshot((snapshot) => this.otherPerson = { '.key': snapshot.id, ...snapshot.data() })
		},
		async fetchOlderMessages(){
			this.isOlderChatsLoading = true
			await this.getChats()
			this.isOlderChatsLoading = false
		},
		cleanUp(){
			this.otherPersonListener()
			this.chatsListener()
			window.clearInterval(this.interval)
		}
	},
	watch:{
		timer(){
			if(Math.floor(this.timer) === 0){
				this.cleanUp()
			}
			if(Math.floor(this.timer) === 1){
				window.setTimeout(() => {
					new window.Toast({ icon: 'info', title: 'The session has ended.' })
					this.showSessionRatingsForm(this.session)
				},1000)
			}
			if(Math.floor(this.timer) === 10){ new window.Toast({ icon: 'warning', title: 'This session will end in 10 seconds.' }) }
		}
	},
	async mounted(){
		this.isLoading = true
		await this.getSessionInfo()
		this.initTimer()
		await this.getChats()
		this.setChatListener()
		this.setOtherPersonListener()
		this.fetched = true
		this.isLoading = false
	},
	beforeDestroy(){
		this.cleanUp()
	},
	computed: {
		...mapGetters(['getId']),
		getTime(){
			const hours = Math.floor(this.timer / 3600).toFixed(0)
			const minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
			const seconds = Math.floor(this.timer % 60).toFixed(0)
			return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
		}
	},
	meta(){
		return {
			title: `Session with ${this.otherPerson.bio ? this.otherPerson.bio.name : 'user'}`,
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
	.flex-grow-2{ flex-grow: 2; }
	#background{
		background: url('../../../assets/images/sessions/background.svg') center repeat;
	}
	ul{
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
	#smaller-height{
		height: calc(100vh - 76px - 106px);
		ul{ height: calc(100vh - 76px - 106px - 50px); }
		@media (min-width: $lg){
			height: calc(100vh - 76px);
			ul{ height: calc(100vh - 76px - 50px) }
		}
	}
	#longer-height{
		ul{ height: calc(100vh - 106px - 76px); }
		@media (min-width: $lg){
	        ul{ height: calc(100vh - 76px) }
		}
	}
</style>
