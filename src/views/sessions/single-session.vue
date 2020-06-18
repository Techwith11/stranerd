<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<session-nav :user="otherPerson" :timer="timer" />
			<div class="container py-3" :id="timer > 0 ? 'smaller-height' : 'longer-height'">
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
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import { firestore } from '@/config/firebase'
    import HelperSpinner from '@/components/helpers/Spinner'
    import HelperMessage from '@/components/helpers/Message'
    import SessionChatForm from "@/components/sessions/single/SessionChatForm"
    import SessionChatMessage from "@/components/sessions/single/SessionChatMessage"
    import SessionNav from "@/components/sessions/single/SessionNav"
	export default {
		name: "SingleSession",
		data: () => ({
			isLoading: true,
			isOlderChatsLoading: false,
			timer: 600,
			interval: null,
			session: {},
			otherPerson: {},
			chats: [],
			paginationLimit: 10,
			hasMore: true,
            otherPersonListener: () => {},
			chatsListener: () => {}
		}),
		components: {
            'helper-spinner': HelperSpinner,
            'helper-message': HelperMessage,
			'session-nav': SessionNav,
			'session-chat-form': SessionChatForm,
			'session-chat-message': SessionChatMessage,
        },
		methods:{
			...mapActions(['showSessionRatingsForm']),
			async getSessionInfo(){
				try{
					let doc = await firestore.collection('sessions').doc(this.$route.params.id).get()
					if(!doc.exists){ return await this.$router.replace('/sessions') }
					let session = { '.key': doc.id, ...doc.data() }
					if(this.getId !== session.tutor && this.getId !== session.student){ return await this.$router.replace('/sessions') }
					if(session.cancelled.tutor || session.cancelled.student){ return await this.$router.replace('/sessions') }
					this.session = session
				}catch(error){ return await this.$router.replace('/sessions') }
			},
            initTimer(){
                let endsAt = new Date(this.session.dates.endedAt.seconds * 1000)
                if(endsAt < new Date()){
                    this.timer = 0
                }else{
                    this.timer = Math.floor((endsAt - new Date()) / 1000)
                    this.interval = setInterval(() => this.timer > 0 ? this.timer-- : null, 1000)
                }
                window.addEventListener('beforeunload',() => { this.cleanUp() })
			},
            async getChats(){
                let docs = firestore.collection(`sessions/${this.session['.key']}/chats`).orderBy('dates.sentAt','desc')
                    .limit(this.paginationLimit)
                if(this.chats.length > 0){
                    let lastItem = this.chats[0]
                    docs = docs.where('dates.sentAt','<',lastItem.dates.sentAt)
                }
                docs = await docs.get()
                this.hasMore = docs.size >= this.paginationLimit
                docs.forEach(doc => this.chats.unshift({ '.key': doc.id, ...doc.data() }))
            },
            setChatListener(){
                let lastItem = this.chats[this.chats.length - 1]
                let query = firestore.collection(`sessions/${this.session['.key']}/chats`).orderBy('dates.sentAt')
                if(lastItem){
                    query = query.where('dates.sentAt','>',lastItem.dates.sentAt)
                }
                this.chatsListener = query.onSnapshot(snapshot => {
                    this.newChats = []
                    snapshot.docs.forEach(doc => this.newChats.push({ '.key': doc.id, ...doc.data() }))
                })
            },
			setOtherPersonListener(){
				let otherPerson = this.session.tutor === this.getId ? this.session.student : this.session.tutor
                this.otherPersonListener = firestore.collection('users').doc(otherPerson)
					.onSnapshot(snapshot => this.otherPerson = { '.key': snapshot.id, ...snapshot.data() })
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
		async activated(){
			this.isLoading = true
			if(!this.session['.key']){
				await this.getSessionInfo()
				await this.getChats()
			}
			this.initTimer()
			this.setChatListener()
			this.setOtherPersonListener()
			this.isLoading = false
		},
		deactivated(){
			this.cleanUp()
		},
		computed: {
			...mapGetters(['getId']),
            getTime(){
                let hours = Math.floor(this.timer / 3600).toFixed(0)
                let minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
                let seconds = Math.floor(this.timer % 60).toFixed(0)
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
	ul{
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
	#smaller-height{
		height: calc(100vh - 168px + 32px);
		ul{
			height: calc(100vh - 206px);
		}
	}
	#longer-height{
		ul{
			height: calc(100vh - 206px + 32px);
		}
	}
</style>