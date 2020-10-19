<template>
	<Default>
		<div class="h-100">
			<page-loading v-if="isLoading"/>
			<div v-else class="d-flex flex-column flex-lg-row h-100">
				<div class="flex-grow-1">
					<session-nav class="h-100" :user="otherPerson" :timer="timer" />
				</div>
				<div class="flex-grow-2 h-100 position-relative" id="background">
					<div class="px-3" :id="timer > 0 ? 'smaller-height' : 'longer-height'">
						<ChatList :session="session['.key']" :timer="timer" />
						<session-chat-form :session="session['.key']" class="mt-auto" v-if="timer > 0" />
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
import SessionNav from '@application/components/sessions/single/SessionNav'
import ChatList from '@/components/sessions/single/ChatList.vue'
export default {
	name: 'SingleSession',
	data: () => ({
		isLoading: true,
		timer: 600,
		interval: null,
		session: {},
		otherPerson: {},
	}),
	components: {
		'session-nav': SessionNav,
		'session-chat-form': SessionChatForm,
		ChatList
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
		async fetchOtherPerson(){
			const otherPerson = this.session.tutor === this.getId ? this.session.student : this.session.tutor
			const doc = await firestore.collection('users').doc(otherPerson).get()
			this.otherPerson = { '.key': doc.id, ...doc.data() }
		},
		cleanUp(){
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
		await this.fetchOtherPerson()
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
			title: `Session with ${this.otherPerson?.bio?.name ?? 'user'}`,
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
	/deep/ ul{
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
	/deep/ #smaller-height{
		height: calc(100vh - 76px - 106px);
		ul{ height: calc(100vh - 76px - 106px - 50px); }
		@media (min-width: $lg){
			height: calc(100vh - 76px);
			ul{ height: calc(100vh - 76px - 50px) }
		}
	}
	/deep/ #longer-height{
		ul{ height: calc(100vh - 106px - 76px); }
		@media (min-width: $lg){
	        ul{ height: calc(100vh - 76px) }
		}
	}
</style>
