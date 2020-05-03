<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<session-nav :user="otherPerson" :timer="timer" />
			<div class="container py-3" :id="timer > 0 ? 'smaller-height' : 'longer-height'">
				<helper-message v-if="chats.length < 1 && newChats.length < 1" message="No messages. Send a message now" />
				<ul class="list-group" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}">
					<li class="d-block text-center small text-muted mb-2" v-if="!hasNoMore">
						<i class="fas text-info fa-spinner fa-spin" v-if="isOlderChatsLoading"></i>
						<span @click="fetchOlderMessages">Fetch Older</span>
					</li>
					<session-chat-message :chat="chat" v-for="chat in chats" :key="chat['.key']" />
					<session-chat-message :chat="chat" v-for="chat in newChats" :key="chat['.key']" />
				</ul>
				<session-chat-form v-if="timer > 0" />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
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
			interval: () => {},
			session: {},
			otherPerson: {},
			chats: [],
			newChats: [],
			paginationLimit: 20,
			hasNoMore: false,
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
		async mounted(){
			await this.getSessionInfo()
			this.initTimer()
			await this.getChats()
			this.setChatListener()
			this.setOtherPersonListener()
            this.isLoading = false
		},
		methods:{
			async getSessionInfo(){
                return firestore.collection('sessions').doc(this.$route.params.id).get()
                    .then(async doc => {
                        if(doc.exists){
							let session = { '.key': doc.id, ...doc.data() }
							if(this.getId !== session.tutor && this.getId !== session.student){ await this.$router.replace('/sessions') }
                            if(session.cancelled.tutor || session.cancelled.student){ await this.$router.replace('/sessions') }
                            this.session = session
                        }else{
							await this.$router.replace('/sessions')
						}
                    }).catch(() => this.$router.replace('/sessions'))
			},
            initTimer(){
                let endsAt = new Date(this.session.dates.endedAt.seconds * 1000)
                if(endsAt < new Date()){
                    this.timer = 0
                }else{
                    this.timer = (endsAt - new Date()) / 1000
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
                if(docs.size < this.paginationLimit){ this.hasNoMore = true }
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
                if(this.timer === 0){
					window.clearInterval(this.interval)
					new window.Toast({ icon: 'info', title: 'The session has ended.' })
					this.chatsListener()
                }
                if(this.timer === 10){ new window.Toast({ icon: 'warning', title: 'This session will be ending in 10 seconds.' }) }
            }
        },
        beforeDestroy(){ this.cleanUp() },
		computed: {
			...mapGetters(['getId']),
            getTime(){
                let hours = Math.floor(this.timer / 3600).toFixed(0)
                let minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
                let seconds = Math.floor(this.timer % 60).toFixed(0)
                return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
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