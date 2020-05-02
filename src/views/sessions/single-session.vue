<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div v-if="doesExist">
				<p>{{ session }}</p>
				<p>{{ tutor }}</p>
				<p>{{ student }}</p>
			</div>
			<helper-message v-else message="No session with such id or you cannot access the session" />
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
    import HelperSpinner from '@/components/helpers/Spinner'
    import HelperMessage from '@/components/helpers/Message'
	export default {
		name: "SingleSession",
		data: () => ({
			isLoading: true,
			doesExist: false,
			session: {},
			tutor: {},
            student: {},
			chats: [],
			newChats: [],
			paginationLimit: 20,
			hasNoMore: false,
            tutorListener: () => {},
            studentListener: () => {},
			chatsListener: () => {}
		}),
		components: {
            'helper-spinner': HelperSpinner,
            'helper-message': HelperMessage,
        },
		mounted(){
			firestore.collection('sessions').doc(this.$route.params.id).get()
				.then(async doc => {
					this.doesExist = doc.exists
					if(this.doesExist){
                        this.session = { '.key': doc.id, ...doc.data() }
                        this.setTutorListener()
                        this.setStudentListener()
						this.getChats()
						if (this.session.done === false){
							this.setChatListener()
						}
					}
					this.isLoading = false
				}).catch(() => {
					this.doesExist = false
					this.isLoading = false
				})
		},
		methods:{
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
                this.chatsListeners = query.onSnapshot(snapshot => {
                    this.newChats = []
                    snapshot.docs.forEach(doc => this.newChats.push({ '.key': doc.id, ...doc.data() }))
                })
            },
			setTutorListener(){
                this.tutorListener = firestore.collection('users').doc(this.session.tutor)
					.onSnapshot(snapshot => this.tutor = { '.key': snapshot.id, ...snapshot.data() })
            },
            setStudentListener(){
                this.studentListener = firestore.collection('users').doc(this.session.student)
					.onSnapshot(snapshot => this.student = { '.key': snapshot.id, ...snapshot.data() })
            }
		},
		beforeDestroy(){
			this.tutorListener()
			this.studentListener()
			this.chatsListeners()
		}
	}
</script>