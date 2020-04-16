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
					<button @click.prevent="goToNext" :class="cannotGoToNext ? 'opacity-25' : 'bg-info'" :disabled="cannotGoToNext">
						<span>Next</span>
						<i class="fas fa-angle-right ml-2"></i>
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
						<option :value="qualification" v-for="qualification in qualifications" :key="qualification">{{ qualification }}</option>
					</select>
				</div>
				<div class="form-group">
					<textarea id="bio" rows="3" class="form-control" v-model="$v.user.bio.$model"  placeholder="A short bio about yourself"
						:class="{'is-invalid': $v.user.bio.$error, 'is-valid': !$v.user.bio.$invalid}">
					</textarea>
				</div>
				<div class="d-flex justify-content-between align-items-center">
					<button class="bg-info" @click.prevent="goToPrevious">
						<i class="fas fa-angle-left mr-2"></i>
						<span>Previous</span>
					</button>
					<button @click.prevent="registerUser" :class="{'opacity-25':$v.$invalid, 'primary-button': !$v.$invalid}" :disabled="$v.$invalid">Submit</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
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
				bio: ''
			},
			page: 1,
			subjects: [
				'Mathematics', 'Physics', 'Chemistry'
			],
			qualifications: [
				'High school graduate', 'Diploma Certificate','Bachelors Degree', 'Masters Degree'
			]
		}),
		methods:{
			...mapActions(['setModalOverview']),
			registerUser(){ alert('Registered')},
			goToNext(){this.page = 2 },
			goToPrevious(){this.page = 1 },
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