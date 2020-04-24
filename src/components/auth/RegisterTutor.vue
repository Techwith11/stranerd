<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i class="fas fa-arrow-left" @click="setModalOverview"></i>
			<h4>Sign up as a Tutor</h4>
			<i></i>
		</div>
		<p class="small text-center my-4">Create an account to allow your account be visible to millions of students worldwide.</p>
		<form class="mx-2">
			<div v-if="page === 1">
				<div class="form-group">
					<input type="text" id="name" class="form-control" placeholder="Full name" v-model.trim="$v.user.name.$model"
						:class="{'is-invalid': $v.user.name.$error, 'is-valid': !$v.user.name.$invalid}">
					<span class="small" v-if="$v.user.name.$error">Must be at least 3 characters</span>
				</div>
				<div class="form-group">
					<input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="$v.user.email.$model"
						:class="{'is-invalid': $v.user.email.$error, 'is-valid': !$v.user.email.$invalid}">
					<span class="small" v-if="$v.user.email.$error">Must be a valid email address</span>
				</div>
				<div class="form-group">
					<input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="$v.user.password.$model"
						:class="{'is-invalid': $v.user.password.$error, 'is-valid': !$v.user.password.$invalid}">
					<span class="small" v-if="$v.user.password.$error">Must be 6-16 characters long</span>
				</div>
				<div class="form-group">
					<input type="password" id="c_password" class="form-control" placeholder="Confirm Password" v-model.trim="$v.user.c_password.$model"
						:class="{'is-invalid': $v.user.c_password.$error, 'is-valid': !$v.user.c_password.$invalid}">
					<span class="small" v-if="$v.user.c_password.$error">Passwords must match</span>
				</div>
				<div class="d-flex justify-content-end">
					<button @click.prevent="registerUser" :class="cannotGoToNext ? 'opacity-25' : 'bg-info'" :disabled="cannotGoToNext || isLoading">
						<span>Next</span>
						<i class="fas ml-2" :class="isLoading ? 'fa-spinner fa-spin' : 'fa-angle-right'"></i>
					</button>
				</div>
			</div>
			<div v-if="page === 2">
				<div class="form-group">
					<select id="course" class="form-control" v-model="$v.user.subject.$model"
						:class="{'is-invalid': $v.user.subject.$error, 'is-valid': !$v.user.subject.$invalid}">
						<option :value="null" disabled>Select a course you can tutor</option>
						<option :value="subject" v-for="subject in subjects" :key="subject">{{ subject }}</option>
					</select>
					<small class="small text-muted">Note: You will be tested on selected course</small>
				</div>
				<div class="form-group">
					<select id="qualification" class="form-control" v-model="$v.user.qualification.$model"
						:class="{'is-invalid': $v.user.qualification.$error, 'is-valid': !$v.user.qualification.$invalid}">
						<option :value="null" disabled>Select your highest level of qualification</option>
						<option :value="qualification.value" v-for="qualification in qualifications" :key="qualification.value">{{ qualification.name }}</option>
					</select>
				</div>
				<div class="form-group">
					<textarea id="bio" rows="3" class="form-control" v-model="$v.user.bio.$model"  placeholder="A short bio about yourself"
						:class="{'is-invalid': $v.user.bio.$error, 'is-valid': !$v.user.bio.$invalid}">
					</textarea>
				</div>
				<div class="d-flex justify-content-end align-items-center">
					<button @click.prevent="makeUserTutor" :class="{'opacity-25':$v.$invalid, 'primary-button': !$v.$invalid}" :disabled="$v.$invalid">Submit</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { auth, firestore } from '@/config/firebase'
	import { required, minLength, email, maxLength, sameAs } from 'vuelidate/lib/validators'
	export default {
		name: 'RegisterTutor',
		data: () => ({
			user: {
				name: '',
				email: '',
				password: '',
				c_password: '',
				subject: null,
				qualification: null,
				bio: '',
				uid: null,
			},
			page: 1,
			subjects: [
				'Mathematics', 'Physics', 'Chemistry'
			],
			qualifications: [
				{ name:'High school graduate', value: 0}, { name: 'Diploma Certificate', value: 1 },
				{ name: 'Bachelors Degree', value: 2 }, { name: 'Masters Degree', value: 3 }
			],
			isLoading: false
		}),
		methods:{
			...mapActions(['setModalOverview','closeModal']),
			registerUser(){
				this.isLoading = true
				auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
					.then(result => {
						this.uid = result.user.uid
						this.isLoading = false
						this.page = 2
					})
					.catch(error => {
						this.isLoading = false
						new window.Toast({ icon: 'error', title: error.message })
					})
			},
			async makeUserTutor(){
				this.isLoading = true
				await firestore.collection('users').doc(this.uid).set({
					bio: {
						name: this.user.name,
						bio: this.user.bio,
					},
					tutor: {
						course: this.user.course,
						qualification: this.user.qualification,
						level: 0
					}
				}, { merge: true })
				this.isLoading = false
				this.closeModal()
				await this.$router.push('/tests/tutors')
			}
		},
		computed: {
			cannotGoToNext(){ return this.$v.user.name.$invalid || this.$v.user.email.$invalid || this.$v.user.password.$invalid ||this.$v.user.c_password.$invalid }
		},
		validations:{
			user: {
				name: { required, minLength: minLength(3) },
				email: { required, email },
				password: { required, minLength: minLength(6), maxLength: maxLength(16) },
				c_password: { required, sameAs: sameAs('password') },
				subject: { required },
				qualification: { required },
				bio: { required, minLength: minLength(3) }
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/index';
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
		max-width: 700px;
		box-shadow: none;
	}
</style>