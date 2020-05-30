<template>
	<div class="my-5">
		<h4 class="text-muted mb-3">Upgrade User to Tutor</h4>
		<div class="d-flex align-items-center">
			<input type="email" class="form-control flex-grow-1" placeholder="Enter user's email address" v-model="email">
			<a @click.prevent="clearAll"><i class="fas fa-trash mx-3 text-danger"></i></a>
		</div>
		<button class="btn btn-primary my-3" @click="getUsersByEmail" :disabled="!email">
			<i class="fas fa-spinner fa-spin mr-2" v-if="fetchingUsers"></i>
			<span>Find User</span>
		</button>
		<div class="mt-3" v-if="fetched && !fetchingUsers">
			<div class="form-group row">
				<div class="col-md-6">
					<select id="course" class="form-control" v-model="$v.tutor.course.$model"
							:class="{'is-invalid': $v.tutor.course.$error, 'is-valid': !$v.tutor.course.$invalid}">
						<option :value="null" disabled>Select the course tutor can teach</option>
						<option :value="subject.name" v-for="subject in subjects" :key="subject.name">{{ subject.name }}</option>
					</select>
				</div>
				<div class="col-md-6 mt-3 mt-md-0">
					<select id="qualification" class="form-control" v-model="$v.tutor.qualification.$model"
							:class="{'is-invalid': $v.tutor.qualification.$error, 'is-valid': !$v.tutor.qualification.$invalid}">
						<option :value="null" disabled>Select tutor's highest level of qualification</option>
						<option :value="qualification.value" v-for="qualification in qualifications" :key="qualification.value">{{ qualification.name }}</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<textarea id="bio" rows="3" class="form-control" v-model="$v.tutor.bio.$model"  placeholder="A short bio about the tutor"
					:class="{'is-invalid': $v.tutor.bio.$error, 'is-valid': !$v.tutor.bio.$invalid}">
				</textarea>
			</div>
		</div>
		<div class="mt-2" v-if="fetched && !fetchingUsers">
			<p class="text-danger opacity-75" v-if="users.length === 0">No user with such email exist</p>
			<div class="my-3 d-flex justify-content-between align-items-center" v-for="user in users" :key="user['.key']">
				<div class="">
					<p class="lead mb-1 text-wrap">{{ user.bio.name }}</p>
					<p class="small mb-0 text-wrap">{{ user.bio.email }}</p>
				</div>
				<button class="btn-sm btn-success" @click="tutorUser(user)" :disabled="upgrading || $v.tutor.$invalid" v-if="!(user.roles.isTutor && user.tutor.courses.includes(tutor.course))">
					<i class="fas fa-spinner fa-spin" v-if="upgrading"></i>
					<span v-else>Make tutor</span>
				</button>
				<a class="text-info" v-else @click.prevent="() => {}">Already a {{ tutor.course }} tutor</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapActions } from 'vuex'
	import { required, minLength } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			email: '',
			fetched: false,
			fetchingUsers: false,
			upgrading: false,
			users: [],
			tutor: {
				course: null,
				qualification: null,
				bio: ''
			},
			subjects: [],
			qualifications: [
				{ name:'High school graduate', value: 0}, { name: 'Diploma Certificate', value: 1 },
				{ name: 'Bachelors Degree', value: 2 }, { name: 'Masters Degree', value: 3 }
			],
		}),
		methods: {
			...mapActions(['makeTutor']),
			clearAll(){
				this.email = ''
				this.fetched = false
				this.fetchingUsers = false
				this.users = []
				this.tutor = { course: null, qualification: null, bio: '' }
				this.$v.$reset()
			},
			async getUsersByEmail(){
				this.fetchingUsers = true
				this.fetched = true
				this.users = []
				let docs = await firestore.collection('users').where('bio.email','==',this.email).get()
				docs.forEach(doc => this.users.push({ '.key': doc.id, ...doc.data() }))
				this.fetchingUsers = false
			},
			async tutorUser(user){
				this.upgrading = true
				let res = await this.makeTutor({ id: user['.key'], ...this.tutor })
				if(res) {
					let x = this.users.find(x => x['.key'] === user['.key'])
					new window.Toast({ icon: 'success', title: `${x.bio.name} has been registered as a ${this.tutor.course} successfully` })
					await this.getUsersByEmail()
				}
				this.upgrading = false
			}
		},
		async mounted(){
			let docs = await firestore.collection('subjects').get()
			docs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
		},
		validations:{
			tutor: {
				course: { required },
				qualification: { required },
				bio: { required, minLength: minLength(3) }
			}
		}
	}
</script>