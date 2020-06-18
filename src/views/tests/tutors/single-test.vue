<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<h3 class="position-sticky sticky-top text-right" :class="{'text-danger': timer <= 120}" v-if="!isMarked">{{ getTime }}</h3>
			<div>
				<question v-for="(question,index) in test.questions" :question="question" :key="question['.key']"
					:onSelect="onAnswerSelected" :index="index" :disabled="isMarked" />
			</div>
			<div class="d-flex justify-content-end mb-5">
				<button class="btn-success" @click="submit" :disabled="isMarked">
					<i class="fas fa-spinner fa-spin mr-2" v-if="isMarked"></i>
					<span>Submit</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
    import HelperSpinner from '@/components/helpers/Spinner'
    import Question from '@/components/tests/tutors/Question'
	import { firestore } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: 'SingleTutorTest',
		data: () => ({
			isLoading: true,
			isMarked: false,
			test: {},
			timer: 600,
			answers: {},
			interval: null
		}),
		computed: {
			...mapGetters(['getId']),
            getTime(){
                let hours = Math.floor(this.timer / 3600).toFixed(0)
                let minutes = Math.floor((this.timer % 3600) / 60).toFixed(0)
                let seconds = Math.floor(this.timer % 60).toFixed(0)
                return `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
            },
		},
        methods: {
			...mapActions(['submitTest']),
			async fetchTest(){
                let doc = await firestore.collection('tests/tutors/tests').doc(this.$route.params.id).get()
                if(doc.exists){
                    this.test = { '.key': doc.id, ...doc.data() }
                    if(this.test.user !== this.getId){ await this.$router.push('/tests/tutors') }
                    if(this.test.marked){
                        new window.Toast({ icon: 'error', title: 'Test has been submitted already' })
                        await this.$router.push('/tests/tutors')
                    }else{
                        let endsAt = new Date(this.test.dates.endedAt.seconds * 1000)
                        if(endsAt < new Date()){
                            new window.Toast({ icon: 'error', title: 'This test was closed without submitting. Submitting now..' })
							this.submitTest({ id: this.$route.params.id, answers: this.answers })
                        }else{
                            this.timer = Math.floor((endsAt - new Date()) / 1000)
                            this.interval = setInterval(() => this.timer > 0 ? this.timer-- : null, 1000)
                        }
					}
                    this.isLoading = false
                }else{
                    await this.$router.push('/tests/tutors')
                }
			},
			onAnswerSelected(key, answer){
				this.answers[key] = answer
			},
            async submit(){
                let result = await new window.SweetAlert({
                    title: 'Submit test',
                    text: 'Are you sure you want to submit now? This cannot be undone',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Submit'
                })
                return result.value ? this.endTest() : null
            },
            async endTest(){
                this.isMarked = true
                clearInterval(this.interval)
				if(document.visibilityState !== 'visible'){
					return this.$router.push('/tests/tutors')
				}
                new window.Toast({ icon: 'info', title: 'Submitting answers' })
                let score = await this.submitTest({ id: this.$route.params.id, answers: this.answers })
                new window.Toast({ icon: 'info', title: `You scored ${score}%` })
                await this.$router.push('/tests/tutors')
            },
		},
        async mounted(){
            await this.fetchTest()
			window.addEventListener('beforeunload', () => window.clearInterval(this.interval))
        },
        components: {
            'helper-spinner': HelperSpinner,
            'question': Question,
		},
        watch:{
            timer(){
                if(Math.floor(this.timer) === 0){ this.endTest() }
            }
        },
		beforeDestroy(){ window.clearInterval(this.interval) },
		meta(){
			return {
				title: `Level ${this.test.level} ${this.test.course}`,
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