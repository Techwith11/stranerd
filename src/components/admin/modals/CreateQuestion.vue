<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<a @click.prevent="setCreateModalOverview"><i class="fas fa-arrow-left"></i></a>
			<h4>Create Question</h4>
			<i></i>
		</div>
		<form class="mx-2">
			<div class="form-group">
				<textarea class="form-control" placeholder="Question..." v-model.trim="$v.question.title.$model" rows="2"
					:class="{'is-invalid': $v.question.title.$error, 'is-valid': !$v.question.title.$invalid}"
				></textarea>
				<span class="small" v-if="$v.question.title.$error">Must be at least 3 characters long</span>
			</div>
			<div class="form-group">
				<select class="form-control" v-model="$v.question.subject.$model"
					:class="{'is-invalid': $v.question.subject.$error, 'is-valid': !$v.question.subject.$invalid}">
					<option :value="null" disabled>Under what subject</option>
					<option :value="subject.name" v-for="subject in subjects" :key="subject.name">{{ subject.name }}</option>
				</select>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" v-model="$v.question.a.$model" placeholder="Option A"
					:class="{'is-invalid': $v.question.a.$error, 'is-valid': !$v.question.a.$invalid}">
			</div>
			<div class="form-group">
				<input type="text" class="form-control" v-model="$v.question.b.$model" placeholder="Option B"
					:class="{'is-invalid': $v.question.b.$error, 'is-valid': !$v.question.b.$invalid}">
			</div>
			<div class="form-group">
				<input type="text" class="form-control" v-model="$v.question.c.$model" placeholder="Option C"
					:class="{'is-invalid': $v.question.c.$error, 'is-valid': !$v.question.c.$invalid}">
			</div>
			<div class="form-group">
				<input type="text" class="form-control" v-model="$v.question.d.$model" placeholder="Option D"
					:class="{'is-invalid': $v.question.d.$error, 'is-valid': !$v.question.d.$invalid}">
			</div>
			<div class="form-group">
				<select class="form-control" v-model="$v.question.answer.$model"
					:class="{'is-invalid': $v.question.answer.$error, 'is-valid': !$v.question.answer.$invalid}">
					<option :value="null" disabled>Select the right answer</option>
					<option :value="answer" v-for="answer in answers" :key="answer">{{ answer.toUpperCase() }}</option>
				</select>
			</div>
			<div class="form-group">
				<input type="number" min="1" class="form-control" v-model="$v.question.level.$model" placeholder="Level"
					:class="{'is-invalid': $v.question.level.$error, 'is-valid': !$v.question.level.$invalid}">
			</div>
			<div class="d-flex flex-column">
				<button @click.prevent="submitQuestion" :disabled="$v.$invalid || $v.$error || isLoading" :class="$v.$invalid || $v.$error ? 'opacity-25' : 'primary-button'">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Create Question</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { firestore } from '@/config/firebase'
	import { required, minLength, minValue } from 'vuelidate/lib/validators'
	export default {
		name: 'CreateQuestion',
		data: () => ({
			question: {
				title: '',
				subject: null,
				a: '',
				b: '',
				c: '',
				d: '',
				answer: null,
				level: 1
			},
			isLoading: false,
			courses: ['Mathematics','Physics', 'Chemistry'],
			answers: ['a','b','c','d'],
			subjects: []
		}),
		async mounted(){
			let docs = await firestore.collection('subjects').get()
			docs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
		},
		methods:{
			...mapActions(['setCreateModalOverview', 'closeCreateModal', 'createQuestion']),
			async submitQuestion() {
				this.isLoading = true
				try {
					await this.createQuestion(this.question)
					this.closeCreateModal()
					new window.Toast({icon: 'success', title: 'Question created successfully'})
				} catch (error) {
					new window.Toast({icon: 'error', title: error.message})
				}
				this.isLoading = false
			}
		},
		validations:{
			question: {
				title: { required, minLength: minLength(3)},
				subject: { required, minLength: minLength(1) },
				a: { required, minLength: minLength(1) },
				b: { required, minLength: minLength(1) },
				c: { required, minLength: minLength(1) },
				d: { required, minLength: minLength(1) },
				answer: { required },
				level: { required, minValue: minValue(1) }
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/index';
	input{
		padding: 1rem;
		max-width: 700px;
	}
	.form-group{
		margin: 1rem 0;
	}
	button{
		margin: 0.5rem 0;
		padding: 0.5rem 1.5rem;
		color: $white;
		display: block;
		min-width: 256px;
		max-width: 700px;
	}
</style>